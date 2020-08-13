import { Fragment } from '@wordpress/element';
import { TimelineNode } from './TimelineNode';

export const TimelineFrontend = (props) => {
	const {
		timeline_title,
		description,
		isSelected,
		...nodeProps
	} = props;

	return (
		<section className="block timeline-block">
			{
				timeline_title
					? <header>
							<h2 className="page-section-header">{ timeline_title }</h2>
						</header>
					: null
			}
			{
				description
					? <div className="page-section-description" dangerouslySetInnerHTML={{ __html: description }} />
					: null
			}
			<TimelineNode { ...nodeProps } />
		</section>
	)
}
