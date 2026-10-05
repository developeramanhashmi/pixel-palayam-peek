<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Business contact details (phone, WhatsApp, maps) live only in src/lib/site-config.ts — single place to update.
- All user-facing copy lives in src/lib/i18n.tsx (en + te dictionaries) — every new string needs both languages.
- Booking enquiries are stored through a validated TanStack server function in Lovable Cloud; anonymous visitors may submit only, and RLS prevents public reads.
- The enquiry form remains an enquiry workflow only; do not add reservations, payments, availability, or guest accounts without an explicit phase update.
