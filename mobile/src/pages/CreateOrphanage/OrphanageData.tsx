import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

import api from '../../services/api';

interface OrphanageDataParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { position } = routes.params as OrphanageDataParams;

  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [opening_hours, setOpeningHours] = useState<string>('');
  const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([]);

  const handleCreateOrphanage = async () => {
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${name}_${index}.jpg`, 
        type: 'image/jpg',
        uri: image
      } as any);
    });

    await api.post('/orphanages', data)
      .then(() => {
        navigation.navigate('OrphanagesMap');
      })
      .catch(() => {
        return alert('Houve um erro inesperado.');
      });
  }

  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      return alert('Necessário conceder acesso as fotos.');
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return;

    const { uri: image } = result;

    setImages([...images, image])
  }

  const handleRemoveImage = async (img: string) =>
  setImages(images => images.filter(image => image !== img))

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */} 

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImageContainer}>
                {images.map(image => (
                    <View key={image} style={styles.imageWrapper}>
                        <Image style={styles.uploadedImage} source={{ uri: image }} />

                        <View style={styles.imageRemove}>
                            <RectButton onPress={() => handleRemoveImage(image)}>
                                <Feather name="x" size={20} color="#FF669D" style={{ backgroundColor: '#FFFFFF' }} />
                            </RectButton>
                        </View>
                    </View>
                ))}
            </View>


      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

    <View style={styles.switchContainer}>
          <Text style={[styles.label, { marginBottom: 0 }]}>Atende final de semana?</Text>
          <Switch thumbColor="#FFFFFF" trackColor={{ false: '#D3E2E5', true: '#39CC83' }} value={openOnWeekends} onValueChange={setOpenOnWeekends} />
    </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'nunito700',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'nunito600',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top'
  },

  uploadedImageContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight:8
  },

  imageWrapper: {
    width: 64,
    height: 64,

    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
},

imageRemove: {
    position: 'absolute',
    top: 0,
    right: 0,

    width: 32,
    height: 32,

    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3E2E5',

    overflow: 'hidden',

    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
},


  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'nunito800',
    fontSize: 16,
    color: '#FFF',
  }
})