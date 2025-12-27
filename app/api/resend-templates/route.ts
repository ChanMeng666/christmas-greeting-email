import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Helper to call Templates API (not exposed in SDK, use raw HTTP)
async function templatesApi(resend: Resend, method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, body?: unknown) {
  if (method === 'GET') {
    return resend.get(`/templates${path}`)
  } else if (method === 'POST') {
    return resend.post(`/templates${path}`, body)
  } else if (method === 'PUT') {
    return resend.put(`/templates${path}`, body)
  } else {
    return resend.delete(`/templates${path}`)
  }
}

// GET - List all templates from Resend
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const apiKey = searchParams.get('apiKey')

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)
    const { data, error } = await templatesApi(resend, 'GET', '')

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, templates: (data as { data?: unknown[] })?.data || [] })
  } catch (error) {
    console.error('List templates error:', error)
    return NextResponse.json(
      { error: 'Failed to list templates' },
      { status: 500 }
    )
  }
}

// POST - Create a new template on Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, name, html, variables, publish } = body

    if (!apiKey || !name || !html) {
      return NextResponse.json(
        { error: 'API key, name, and html are required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)

    // Create the template
    const createResult = await templatesApi(resend, 'POST', '', {
      name,
      html,
      variables: variables || [],
    })

    if (createResult.error) {
      return NextResponse.json(
        { error: createResult.error.message },
        { status: 400 }
      )
    }

    const templateId = (createResult.data as { id?: string })?.id

    // Optionally publish the template
    if (publish && templateId) {
      const publishResult = await templatesApi(resend, 'POST', `/${templateId}/publish`, {})
      if (publishResult.error) {
        return NextResponse.json(
          { error: publishResult.error.message },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      template: createResult.data,
      published: publish || false,
    })
  } catch (error) {
    console.error('Create template error:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
