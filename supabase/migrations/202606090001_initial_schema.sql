begin;

create extension if not exists "pgcrypto";

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.set_owner_user_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if new.user_id is null then
    new.user_id = auth.uid();
  end if;

  if new.user_id <> auth.uid() then
    raise exception 'user_id must match the authenticated user';
  end if;

  return new;
end;
$$;

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  check_in_date date not null default current_date,
  sleep smallint not null check (sleep between 1 and 5),
  energy smallint not null check (energy between 1 and 5),
  anxiety smallint not null check (anxiety between 1 and 5),
  focus smallint not null check (focus between 1 and 5),
  mood smallint not null check (mood between 1 and 5),
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint checkins_note_length check (char_length(coalesce(note, '')) <= 1000),
  constraint checkins_user_day_unique unique (user_id, check_in_date)
);

create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_start date not null,
  week_end date not null,
  checkin_count integer not null default 0 check (checkin_count >= 0),
  average_sleep numeric(3,2),
  average_energy numeric(3,2),
  average_anxiety numeric(3,2),
  average_focus numeric(3,2),
  average_mood numeric(3,2),
  summary text not null,
  patterns jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint insights_week_range_valid check (week_end = week_start + 6),
  constraint insights_avg_sleep_range check (average_sleep is null or average_sleep between 1 and 5),
  constraint insights_avg_energy_range check (average_energy is null or average_energy between 1 and 5),
  constraint insights_avg_anxiety_range check (average_anxiety is null or average_anxiety between 1 and 5),
  constraint insights_avg_focus_range check (average_focus is null or average_focus between 1 and 5),
  constraint insights_avg_mood_range check (average_mood is null or average_mood between 1 and 5),
  constraint insights_summary_length check (char_length(summary) between 1 and 3000),
  constraint insights_user_week_unique unique (user_id, week_start)
);

create index if not exists checkins_user_id_check_in_date_idx
  on public.checkins (user_id, check_in_date desc);

create index if not exists checkins_user_id_created_at_idx
  on public.checkins (user_id, created_at desc);

create index if not exists insights_user_id_week_start_idx
  on public.insights (user_id, week_start desc);

create index if not exists insights_generated_at_idx
  on public.insights (generated_at desc);

create index if not exists insights_patterns_gin_idx
  on public.insights
  using gin (patterns jsonb_path_ops);

create index if not exists insights_recommendations_gin_idx
  on public.insights
  using gin (recommendations jsonb_path_ops);

create index if not exists insights_metadata_gin_idx
  on public.insights
  using gin (metadata jsonb_path_ops);

drop trigger if exists set_checkins_owner on public.checkins;
create trigger set_checkins_owner
before insert on public.checkins
for each row
execute function public.set_owner_user_id();

drop trigger if exists set_insights_owner on public.insights;
create trigger set_insights_owner
before insert on public.insights
for each row
execute function public.set_owner_user_id();

drop trigger if exists set_checkins_updated_at on public.checkins;
create trigger set_checkins_updated_at
before update on public.checkins
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_insights_updated_at on public.insights;
create trigger set_insights_updated_at
before update on public.insights
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.checkins enable row level security;
alter table public.insights enable row level security;

drop policy if exists "Users can read their own checkins" on public.checkins;
create policy "Users can read their own checkins"
on public.checkins
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own checkins" on public.checkins;
create policy "Users can insert their own checkins"
on public.checkins
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own checkins" on public.checkins;
create policy "Users can update their own checkins"
on public.checkins
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own checkins" on public.checkins;
create policy "Users can delete their own checkins"
on public.checkins
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can read their own insights" on public.insights;
create policy "Users can read their own insights"
on public.insights
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own insights" on public.insights;
create policy "Users can insert their own insights"
on public.insights
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own insights" on public.insights;
create policy "Users can update their own insights"
on public.insights
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own insights" on public.insights;
create policy "Users can delete their own insights"
on public.insights
for delete
to authenticated
using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.checkins to authenticated;
grant select, insert, update, delete on public.insights to authenticated;

commit;
