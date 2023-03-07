import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import {useState} from 'react'

import { FlatList } from "react-native";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState(['Guib', 'Silva'])


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

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({item }) => (
                    <PlayerCard 
                        onRemove={() => {}} 
                        name={item}/>
                )}
                ListEmptyComponent={() => (
                    <ListEmpty  
                        message="Não há mais pessoas nesse time?"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1}
                ]}
            />

            <Button title="Teste"/>
        </Container>
    )
}