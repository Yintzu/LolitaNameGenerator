import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
)

export const postFeedback = async (postData: {
  type: string
  word: string
  comment: string
}) => {
  const res = await supabase.from("Feedback").insert(postData)
  return res
}
