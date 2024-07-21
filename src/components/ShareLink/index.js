import React from "react";
import { RWebShare } from "react-web-share";
import { Image } from 'react-bootstrap';

export default function WebShareGfg(props) {
    return (
		<div className="shareLink">
			<RWebShare
				data={{
					text: props.text,
					url: props.url,
					title: props.title,
				}}
				onClick={() => console.log(props)}
			>
            <Image 
                className='shareIcon'
                style={{width: "26px"}}
                src={require(`../../images/share.png`)} 
            />
			</RWebShare>
		</div>
	);
};
