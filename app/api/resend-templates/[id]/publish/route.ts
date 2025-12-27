import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST - Publish a template
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { apiKey } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)
    const { data, error } = await resend.post(`/templates/${id}/publish`, {})

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error) {
    console.error('Publish template error:', error)
    return NextResponse.json(
      { error: 'Failed to publish template' },
      { status: 500 }
    )
  }
}
