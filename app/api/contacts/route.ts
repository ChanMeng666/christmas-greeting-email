import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// GET - List contacts from Resend Audience
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const apiKey = searchParams.get('apiKey')
    const audienceId = searchParams.get('audienceId')

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: 'API key and Audience ID are required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.contacts.list({
      audienceId,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, contacts: data?.data || [] })
  } catch (error) {
    console.error('List contacts error:', error)
    return NextResponse.json(
      { error: 'Failed to list contacts' },
      { status: 500 }
    )
  }
}

// POST - Add contact to Resend Audience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, audienceId, email, firstName, lastName } = body

    if (!apiKey || !audienceId || !email) {
      return NextResponse.json(
        { error: 'API key, Audience ID, and email are required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.contacts.create({
      audienceId,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      unsubscribed: false,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, contact: data })
  } catch (error) {
    console.error('Add contact error:', error)
    return NextResponse.json(
      { error: 'Failed to add contact' },
      { status: 500 }
    )
  }
}

// DELETE - Remove contact from Resend Audience
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, audienceId, email } = body

    if (!apiKey || !audienceId || !email) {
      return NextResponse.json(
        { error: 'API key, Audience ID, and email are required' },
        { status: 400 }
      )
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.contacts.remove({
      audienceId,
      email,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Remove contact error:', error)
    return NextResponse.json(
      { error: 'Failed to remove contact' },
      { status: 500 }
    )
  }
}
