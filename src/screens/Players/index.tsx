import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import {useState} from 'react'

import { FlatList } from "react-native";

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState(['Guibson', 'Silva', 'Ana'])


    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title="Nome da turma"
                subtitle="Adicione a galera e serapre os times"
            />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />

                <ButtonIcon icon="add" />
            </Form>

            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor = {item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item} 
                            isActive={item === team}  
                            onPress={() => setTeam(item)}                
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>


        </Container>
    )
}