import React from 'react'

/**
 * Formats a date string to JSX with day in a span, and month/year in a div with separate spans
 * Example: <><span>15</span><div><span>Jan</span><span>2024</span></div></>
 */
export const formatEventDate = (dateString: string | null | undefined): React.JSX.Element | string => {
	if (!dateString) return ''

	const date = new Date(dateString)
	if (isNaN(date.getTime())) return ''

	const day = date.getDate()
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const month = monthNames[date.getMonth()]
	const year = date.getFullYear()

	return (
		<div
			className='date-card'
		>
			<span className='day'>{day}</span>
			<div
				className='inner'
			>
				<span className='month'>{month}</span>
				<span className='year'>{year}</span>
			</div>
		</div>
	)
}

