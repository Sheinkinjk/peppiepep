-- Add narrative story blocks to campaign snapshots for branded storytelling
alter table public.campaigns
  add column if not exists snapshot_story_blocks jsonb;

update public.campaigns c
set snapshot_story_blocks = coalesce(
  snapshot_story_blocks,
  jsonb_build_array(
    jsonb_build_object(
      'type', 'testimonial',
      'eyebrow', 'Ambassador spotlight',
      'quote', coalesce(
        'I love gifting friends ' || coalesce(c.snapshot_new_user_reward_text, c.snapshot_offer_text, 'a VIP welcome gift') || ' and seeing the concierge recognize us instantly.',
        'I love gifting friends a VIP welcome gift and seeing the concierge recognize us instantly.'
      ),
      'author', 'Private ambassador',
      'credential', 'Top referrer this season'
    ),
    jsonb_build_object(
      'type', 'reward_calculator',
      'title', 'Reward runway',
      'description', 'Multiply the rewards as your inner circle leans in.',
      'entries', jsonb_build_array(
        jsonb_build_object(
          'label', '1 referral',
          'value', coalesce(c.snapshot_client_reward_text, 'a premium thank-you reward')
        ),
        jsonb_build_object(
          'label', '3 referrals',
          'value', '3 x ' || coalesce(c.snapshot_client_reward_text, 'your reward')
        ),
        jsonb_build_object(
          'label', '10 referrals',
          'value', 'Concierge recognition + seasonal experiences'
        )
      ),
      'footer', 'Friends receive ' || coalesce(c.snapshot_new_user_reward_text, c.snapshot_offer_text, 'a VIP welcome credit')
    ),
    jsonb_build_object(
      'type', 'faq',
      'title', 'What insiders ask',
      'items', jsonb_build_array(
        jsonb_build_object(
          'question', 'How fast do rewards release?',
          'answer', 'Rewards drop as soon as bookings clear.'
        ),
        jsonb_build_object(
          'question', 'Where do I track everything?',
          'answer', 'Use the ambassador portal to see every click, booking, and payout.'
        ),
        jsonb_build_object(
          'question', 'What do my friends receive?',
          'answer', 'They unlock ' || coalesce(c.snapshot_new_user_reward_text, c.snapshot_offer_text, 'a welcome gift') || '.'
        )
      )
    )
  )
)
where snapshot_story_blocks is null;
