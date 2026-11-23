-- Editorial update for previously published posts. Match the original copy so
-- newer edits to a passage are preserved. Source: https://www.wireguard.com/protocol/
begin;

do $$
declare
  edit record;
begin
  for edit in
    select * from (values
      ('aura-vpn-review',
       'Aura VPN describes its protection around AES-256 encryption for traffic between your device and the VPN. AES-256 is a widely used modern encryption standard, and it is a reasonable baseline to expect from a consumer VPN.',
       'Aura VPN uses WireGuard to encrypt traffic between your device and the VPN server. WireGuard uses ChaCha20 for encryption and Poly1305 for authentication.'),
      ('aura-vpn-review',
       'the clearly stated AES-256 encryption claim',
       'WireGuard encryption'),
      ('best-vpn-for-torrenting-safe-private',
       'Aura VPN describes its protection as AES-256 bit encryption, which is designed to help keep data private from snoopers, hackers, and other unwanted observers.',
       'Aura VPN uses WireGuard to encrypt traffic between your device and the VPN server.'),
      ('best-vpn-for-turkey-2026-guide',
       'Aura VPN uses AES-256 bit encryption, which is designed to keep your traffic unreadable to local network observers, including people sharing hotel or cafe Wi-Fi with you.',
       'Aura VPN uses WireGuard to encrypt traffic between your device and the VPN server, including when you connect over hotel or cafe Wi-Fi.'),
      ('best-vpn-for-turkey-2026-guide',
       'Aura VPN uses AES-256 encryption, follows a clear no-logs policy that does not track, store, or share online activity or personal data',
       'Aura VPN uses WireGuard, has a policy against logging browsing activity'),
      ('best-vpn-for-turkey-2026-guide',
       'Aura VPN is built around exactly that: AES-256 encryption, a no-logs policy that does not track, store, or share your activity',
       'Aura VPN offers WireGuard encryption, a policy against logging browsing activity'),
      ('is-clash-vpn-safe-review-alternatives',
       '- AES-256 encryption for traffic between your device and the VPN.',
       '- WireGuard encryption between your device and the VPN server.'),
      ('vpn-for-iphone',
       'It also describes AES-256 encryption for traffic between your device and the VPN.',
       'Aura VPN uses WireGuard to encrypt traffic between your device and the VPN server.'),
      ('vpn-for-iphone',
       'simple setup through an iOS app, AES-256 encryption',
       'simple setup through an iOS app, WireGuard encryption'),
      ('vpn-for-roblox-safe-private-guide',
       'Aura VPN uses AES-256 encryption and is designed for fast, private, secure internet access, which is the kind of profile that tends to work well for gaming.',
       'Aura VPN uses WireGuard. Try a nearby VPN location and compare your in-game latency on the same network.'),
      ('vpn-for-roblox-safe-private-guide',
       'It uses AES-256 encryption, follows a no-logs policy',
       'It uses WireGuard, follows a no-logs policy')
    ) as changes(slug, original, replacement)
  loop
    update public.web
    set content = replace(content, edit.original, edit.replacement), updated_at = now()
    where slug = edit.slug and status = 'published' and strpos(content, edit.original) > 0;
  end loop;
end
$$;

update public.web
set faqs = replace(faqs::text,
      'Aura VPN is a strong alternative for users who want straightforward apps, AES-256 encryption, and a clear no-logs policy.',
      'Aura VPN offers WireGuard encryption and apps for iPhone, iPad, Mac, and Android.'
    )::jsonb,
    updated_at = now()
where slug = 'is-clash-vpn-safe-review-alternatives' and status = 'published'
  and strpos(faqs::text, 'Aura VPN is a strong alternative for users who want straightforward apps, AES-256 encryption, and a clear no-logs policy.') > 0;

commit;
