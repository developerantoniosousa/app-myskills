import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from './components/Button';
import { SkillCard } from './components/SkillCard';

export interface Skill {
  id: string;
  name: string;
}

export enum GREETING {
  GOOD_MORNING = 'Good morning',
  GOOD_AFTERNOON = 'Good afternoon',
  GOOD_NIGHT = 'Good night',
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting(GREETING.GOOD_MORNING);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(GREETING.GOOD_AFTERNOON);
    } else {
      setGreeting(GREETING.GOOD_NIGHT);
    }
  }, []);

  function handleAddNewSkill() {
    if (!newSkill) {
      return;
    }
    const addingSkill = {
      id: String(Date.now()),
      name: newSkill,
    };
    setMySkills(existedSkills => [...existedSkills, addingSkill]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(existedSkills =>
      existedSkills.filter(skill => skill.id !== id),
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Antonio</Text>
      <Text style={styles.greeting}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />
      <Button title="Add" activeOpacity={0.7} onPress={handleAddNewSkill} />

      <Text style={[styles.title, styles.mySkills]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item: skill }) => (
          <SkillCard
            key={skill.id}
            skill={skill.name}
            onLongPress={() => handleRemoveSkill(skill.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  mySkills: {
    marginVertical: 50,
  },
  greeting: {
    color: '#FFF',
  },
});
