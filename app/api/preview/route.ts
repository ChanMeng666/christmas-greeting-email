import { NextRequest, NextResponse } from 'next/server'
import * as React from 'react'
import { render } from '@react-email/render'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
} from '@react-email/components'

interface Block {
  id: string
  type: string
  props: Record<string, unknown>
  visible?: boolean
}

interface Theme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  surfaceColor: string
  textColor: string
  borderColor: string
  borderWidth: number
  shadowOffset: number
}

// POST - Render template to HTML
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blocks, theme, variables } = body

    if (!blocks || !Array.isArray(blocks)) {
      return NextResponse.json(
        { error: 'Blocks array is required' },
        { status: 400 }
      )
    }

    const defaultTheme: Theme = {
      primaryColor: '#DC2626',
      secondaryColor: '#16A34A',
      accentColor: '#F59E0B',
      backgroundColor: '#1a1a2e',
      surfaceColor: '#FFFBEB',
      textColor: '#000000',
      borderColor: '#000000',
      borderWidth: 4,
      shadowOffset: 8,
    }

    const mergedTheme = { ...defaultTheme, ...theme }
    const defaultVariables = {
      recipientName: 'Friend',
      senderName: 'Your Name',
      currentYear: new Date().getFullYear().toString(),
      nextYear: (new Date().getFullYear() + 1).toString(),
      ...variables,
    }

    const html = await renderBlocksToHtml(blocks, mergedTheme, defaultVariables)

    return NextResponse.json({ success: true, html })
  } catch (error) {
    console.error('Preview render error:', error)
    return NextResponse.json(
      { error: 'Failed to render preview' },
      { status: 500 }
    )
  }
}

async function renderBlocksToHtml(
  blocks: Block[],
  theme: Theme,
  variables: Record<string, string>
): Promise<string> {
  const processVariables = (text: string): string => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      return variables[varName] || match
    })
  }

  const emailElement = React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(
      Body,
      {
        style: {
          backgroundColor: theme.backgroundColor,
          fontFamily: "'Trebuchet MS', 'Lucida Grande', Tahoma, sans-serif",
          margin: 0,
          padding: '40px 20px',
        },
      },
      React.createElement(
        Container,
        {
          style: {
            backgroundColor: theme.surfaceColor,
            border: `${theme.borderWidth}px solid ${theme.borderColor}`,
            boxShadow: `${theme.shadowOffset}px ${theme.shadowOffset}px 0px 0px ${theme.borderColor}`,
            maxWidth: '600px',
            margin: '0 auto',
          },
        },
        blocks
          .filter((block) => block.visible !== false)
          .map((block) => renderBlock(block, theme, processVariables))
      )
    )
  )

  return await render(emailElement)
}

function renderBlock(
  block: Block,
  theme: Theme,
  processVariables: (text: string) => string
): React.ReactElement | null {
  const { type, props, id } = block

  switch (type) {
    case 'header':
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            backgroundColor: theme.primaryColor,
            padding: '40px 30px',
            textAlign: 'center' as const,
            borderBottom: `4px solid ${theme.borderColor}`,
          },
        },
        React.createElement(
          Text,
          {
            style: {
              color: theme.surfaceColor,
              fontSize: '14px',
              textTransform: 'uppercase' as const,
              letterSpacing: '3px',
              margin: '0 0 10px 0',
            },
          },
          processVariables((props.subtitle as string) || "Season's Greetings")
        ),
        React.createElement(
          Text,
          {
            style: {
              color: '#FFFFFF',
              fontSize: '42px',
              fontWeight: 900,
              textTransform: 'uppercase' as const,
              letterSpacing: '3px',
              margin: 0,
              textShadow: `4px 4px 0px ${theme.borderColor}`,
            },
          },
          processVariables((props.title as string) || 'Merry Christmas')
        )
      )

    case 'text':
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            padding: '20px 30px',
          },
        },
        React.createElement(
          Text,
          {
            style: {
              color: theme.textColor,
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
            },
          },
          processVariables((props.content as string) || '')
        )
      )

    case 'image':
      const src = props.src as string
      if (!src) {
        return React.createElement(
          Section,
          {
            key: id,
            style: {
              padding: '20px 30px',
            },
          },
          React.createElement(
            'div',
            {
              style: {
                backgroundColor: '#E5E7EB',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `${theme.borderWidth}px solid ${theme.borderColor}`,
              },
            },
            React.createElement(
              Text,
              { style: { color: '#9CA3AF' } },
              'Image placeholder'
            )
          )
        )
      }
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            padding: '20px 30px',
          },
        },
        React.createElement(Img, {
          src: processVariables(src),
          alt: (props.alt as string) || 'Email image',
          style: {
            width: '100%',
            border: `${theme.borderWidth}px solid ${theme.borderColor}`,
            boxShadow: `${theme.shadowOffset}px ${theme.shadowOffset}px 0px 0px ${theme.primaryColor}`,
          },
        })
      )

    case 'button':
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            padding: '20px 30px',
            textAlign: 'center' as const,
          },
        },
        React.createElement(
          Link,
          {
            href: processVariables((props.url as string) || '#'),
            style: {
              backgroundColor: theme.secondaryColor,
              color: '#FFFFFF',
              padding: '14px 28px',
              textDecoration: 'none',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
              border: `${theme.borderWidth}px solid ${theme.borderColor}`,
              boxShadow: `4px 4px 0px 0px ${theme.borderColor}`,
              display: 'inline-block',
            },
          },
          processVariables((props.text as string) || 'Click Here')
        )
      )

    case 'wishes':
      const items = (props.items as Array<{ icon: string; text: string }>) || [
        { icon: '⭐', text: 'Joy and happiness' },
        { icon: '⭐', text: 'Success in all endeavors' },
        { icon: '⭐', text: 'Health and wellness' },
      ]
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            backgroundColor: `${theme.primaryColor}15`,
            padding: '30px',
            borderTop: `4px solid ${theme.borderColor}`,
            borderBottom: `4px solid ${theme.borderColor}`,
          },
        },
        React.createElement(
          Text,
          {
            style: {
              fontSize: '20px',
              fontWeight: 700,
              color: theme.textColor,
              margin: '0 0 20px 0',
            },
          },
          processVariables((props.title as string) || 'My Wishes for You')
        ),
        ...items.map((item, index) =>
          React.createElement(
            Text,
            {
              key: index,
              style: {
                fontSize: '16px',
                color: theme.textColor,
                margin: '8px 0',
              },
            },
            `${item.icon} ${processVariables(item.text)}`
          )
        )
      )

    case 'divider':
      return React.createElement(Hr, {
        key: id,
        style: {
          borderTop: `4px solid ${theme.borderColor}`,
          margin: '20px 0',
        },
      })

    case 'footer':
      return React.createElement(
        Section,
        {
          key: id,
          style: {
            backgroundColor: theme.secondaryColor,
            padding: '30px',
            textAlign: 'center' as const,
          },
        },
        React.createElement(
          Text,
          {
            style: {
              color: '#FFFFFF',
              fontSize: '12px',
              textTransform: 'uppercase' as const,
              letterSpacing: '2px',
              margin: '0 0 10px 0',
            },
          },
          processVariables((props.senderLabel as string) || 'Warm Regards From')
        ),
        React.createElement(
          Text,
          {
            style: {
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
            },
          },
          processVariables((props.senderName as string) || '{{senderName}}')
        )
      )

    default:
      return null
  }
}
