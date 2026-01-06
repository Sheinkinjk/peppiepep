alter table public.referral_events
  drop constraint if exists referral_events_event_type_check,
  add constraint referral_events_event_type_check
    check (
      event_type in (
        'link_visit',
        'signup_submitted',
        'conversion_pending',
        'conversion_completed',
        'manual_conversion_recorded',
        'payout_released',
        'payout_adjusted',
        'campaign_message_queued',
        'campaign_message_sent',
        'campaign_message_delivered',
        'campaign_message_failed',
        'campaign_delivery_batch_started',
        'campaign_delivery_batch_finished',
        'schedule_call_clicked',
        'contact_us_clicked',
        'program_settings_updated'
      )
    );
