'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="w-full max-w-full overflow-x-hidden whitespace-pre-wrap break-words bg-black p-4 border text-xs border-border rounded">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'flex', line })}>
              <span className="w-8 shrink-0 select-none text-right text-white/25">{i + 1}</span>
              <span className="min-w-0 flex-1 pl-4 whitespace-pre-wrap break-words">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}
