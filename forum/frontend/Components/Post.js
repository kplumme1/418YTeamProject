import React from 'react'
import Figure from 'react-bootstrap/Figure'
import Logo from '../logo.png'

function Post() {
    return (
        <div>
            <h1 style = {{marginLeft: "10px", marginTop: "10px"}}>POST TITLE HERE</h1>
            <Figure style = {{marginLeft: "10px", marginTop: "10px", backgroundColor: "white", border: "3px solid black", borderRadius: "30px", padding: "10px"}}>
                <Figure.Image width={125} height={125} src={Logo} />
                <Figure.Caption style = {{color: "black", fontSize: "24px"}}>
                    NAME
                </Figure.Caption>
                <Figure.Caption style = {{color: "black", fontSize: "18px"}}>
                    This would be a post! It would definitely be longer than this and needs styling!
                </Figure.Caption>
            </Figure>
            <br></br>
            <Figure style = {{marginLeft: "80px", marginTop: "10px", backgroundColor: "white", border: "3px solid black", borderRadius: "30px", padding: "10px"}}>
                <Figure.Image width={125} height={125} src={Logo} />
                <Figure.Caption style = {{color: "black", fontSize: "24px"}}>
                    REPLIER NAME
                </Figure.Caption>
                <Figure.Caption style = {{color: "black", fontSize: "18px"}}>
                    This is a reply! It's like those Blackboard things where we say "I definitely agree with your post!"
                </Figure.Caption>
            </Figure>
        </div>
    );
}

export default Post