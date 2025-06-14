import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * API route handler to fetch all projects from Supabase.
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!baseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase configuration')
    }

    const fetchUrl = `${baseUrl}/rest/v1/Project?select=*`

    const response = await fetch(fetchUrl, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`)
    }

    const projects = await response.json()

    res.status(200).json({ projects })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    res.status(500).json({ error: message })
  }
}
