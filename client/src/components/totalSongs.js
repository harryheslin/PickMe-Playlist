import { React, useState } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import styled from 'styled-components'

export default function TotalSongsOptions(props) {
    const [buttons, setButtons] = useState(() => {
        let buttonsTemp = [];
        for (let i = 20; i <= 100; i += 20) {
            buttonsTemp.push({
                number: i,
                class: 'buttons'
            })
        }
        return buttonsTemp;
    })

    function buttonClicked(index, value) {
        props.setSongAmount(value);
        let temp = [...buttons];
        temp.forEach(element => {
            element.class = 'buttons';
        });
        temp[index].class = 'selected-button'
        setButtons(temp);
    }

    return (
        <Styles>
            <ButtonGroup className="mr-2">
                {buttons.map((i, index) => {
                    return (
                        <Button key={i.number} className={i.class} onClick={(event) => buttonClicked(index, i.number)} variant="secondary">{i.number}</Button>
                    )
                })}
            </ButtonGroup>
        </Styles>
    )
}
const Styles = styled.div`
.buttons{
    color: white;
    background-color: black;
    width: 13vw;
    margin-top: 2%;
}
.selected-button{
    background-color: rgba(30, 215, 96);
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
    color: white;
    width: 12vw;
    margin-top: 2%;
}`