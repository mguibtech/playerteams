
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from './styles';
import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupGetAll';
import { Alert } from 'react-native'
import { Loading } from '@components/Loading';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation();


  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll();
      setGroups(data)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />
      
      {isLoading ? <Loading /> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      }

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />


    </Container>
  );
}