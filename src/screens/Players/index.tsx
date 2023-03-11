import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import {useState, useEffect, useRef} from 'react'

import { FlatList, TextInput } from "react-native";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import {Alert} from 'react-native'
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

type RouteParams = {
    group: string;
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const routes = useRoute();
    const {group} = routes.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0 ){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar!')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try{
            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur()
            setNewPlayerName('')
            fetchPlayersByTeam();

        }catch(error){
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }else{
                console.log(error)
                Alert.alert('Nova pessoa', 'Não foi possível adicionar!')
            }
        }

    }

    async function fetchPlayersByTeam() {
        try{
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)
        }catch(error){
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas filtradas do time selecionado')
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try{
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam();
        }catch(error){
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])


    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Adicione a galera e serapre os times"
            />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    autoCorrect={false}
                    inputRef={newPlayerNameInputRef}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon icon="add" onPress={handleAddPlayer}/>
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
                keyExtractor={item => item.name}
                renderItem={({item }) => (
                    <PlayerCard 
                        onRemove={() => handleRemovePlayer(item.name)} 
                        name={item.name}/>
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

            <Button type="SECONDARY" title="Remover Turma"/>
        </Container>
    )
}