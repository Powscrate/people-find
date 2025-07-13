import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Based on the JSON structure from randomuser.me and usage in your components
export interface User {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string | number
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  id: {
    name: string
    value: string | null
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

interface ApiResponse {
  results: User[]
}

// fetch tous les users
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<ApiResponse>('https://randomuser.me/api/?results=50')
  return data.results
}

// fetch par genre
const fetchUsersByGender = async (gender: 'male' | 'female'): Promise<User[]> => {
  const { data } = await axios.get<ApiResponse>(`https://randomuser.me/api/?results=50&gender=${gender}`)
  return data.results
}

// hook custom
export const useUsers = (gender?: 'male' | 'female') => {
  return useQuery<User[], Error>({
    queryKey: ['users', gender || 'all'],
    queryFn: () => gender ? fetchUsersByGender(gender) : fetchUsers(),
  })
}