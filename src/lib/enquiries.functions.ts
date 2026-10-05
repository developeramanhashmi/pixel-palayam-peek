import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const enquirySchema = z
  .object({
    guest_name: z.string().trim().min(1).max(100),
    address: z.string().trim().min(1).max(500),
    contact_number: z.string().trim().regex(/^\+?[0-9][0-9 -]{8,14}$/),
    room_type: z.enum(["AC", "NON_AC"]),
    number_of_rooms: z.number().int().positive(),
    total_guests: z.number().int().positive(),
    additional_requirements: z.string().trim().max(2000).optional(),
  })
  .strict();

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { success: false };

    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await client.from("enquiries").insert({
      ...data,
      additional_requirements: data.additional_requirements || null,
    });

    return { success: !error };
  });