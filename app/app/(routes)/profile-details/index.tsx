import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Text, Card, Title, Paragraph} from 'react-native-paper';
import useUser from '@/hooks/auth/useUser';

const index = () => {
  const {user} = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       {user?.avatar && <Avatar.Image size={100} source={{ uri: user.avatar.url }} />}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
     {user?.courses && (
       <FlatList
       data={user?.courses}
       keyExtractor={(item) => item?._id}
       renderItem={({ item }) => (
         <Card style={styles.card}>
           <Card.Content>
             <Title>{item?.title}</Title>
             <Paragraph>{item.description}</Paragraph>
           </Card.Content>
         </Card>
       )}
     />
     )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  card: {
    margin: 10,
  },
});

export default index;
