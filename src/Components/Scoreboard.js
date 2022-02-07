import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Scoreboard = ({listSize}) => {
    const [scoreBoardData, setScoreBoardData] = useState(null);

    const fetchData = async () => {
        const response = await axios.get('https://mocki.io/v1/b84a3561-ce41-46c0-85a8-46617836e457');
        const data = Object.keys(response.data).map(item => response.data[item]);
        setScoreBoardData(data);
    }

    const descendingScores = scoreBoardData?.sort((a, b) => b.playerScore - a.playerScore);

    useEffect(() => {
        fetchData()
    }, [])

    return (
    <>
        {descendingScores?.slice(0,listSize).map((scoreData, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{scoreData.playerName}</td>
                    <td>{scoreData.playerScore}</td>
                </tr>
        ))}
    </>
    );
};

export default Scoreboard;
