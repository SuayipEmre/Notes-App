import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/style/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { wh, wp } from '@/style/common'
import { setIsModalOpen } from '@/store/features/notes/actions';
import NoteModal from '@/components/Modal';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getUserDocument } from '@/utils/getUserDocument';
import NoteCard from '@/components/NoteCard';
import CategoryItem from '@/components/CategoryItem';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const currentUser: FirebaseAuthTypes.User | null = auth().currentUser
    const [userNotes, setUserNotes] = useState<[] | note[]>([])
    const [userCategories, setUserCategories] = useState<category[] | []>([])
    const handleSelectCategory = (category: string) => {
        if (category == activeCategory) return setActiveCategory('All')
        setActiveCategory(category)
    }


    useEffect(() => {
        getUserNotesFromDB()
    }, [])

    const getUserNotesFromDB = async () => {
        const dbRef = await getUserDocument(currentUser)

        if (dbRef.exists) {
            const userData = dbRef.data()
            const userNotes = userData?.notes ?? []
            const userCategories = userData?.notes?.map((item: note) => item?.category)

            const uniqueCategories = userCategories.reduce((acc: { title: string; amount: number }[], category: string) => {
                const existingCategory = acc.find(item => item.title === category);

                if (existingCategory) {
                    existingCategory.amount += 1; // Eğer kategori zaten varsa miktarı artır
                } else {
                    acc.push({ title: category, amount: 1 }); // Eğer yoksa yeni bir obje ekle
                }

                return acc;
            }, []);


            setUserCategories(uniqueCategories)



            setUserCategories(uniqueCategories)

            setUserNotes(userNotes as note[])
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notess</Text>
                <AntDesign name="search1" size={wp * 0.07} color={colors.veryLightGray} />
            </View>

            <FlatList
                data={userNotes}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={styles.notesContainer}
                renderItem={({ item }) => <NoteCard note={item} />}
                ListHeaderComponent={/*Categories */
                    <FlatList
                        horizontal
                        data={userCategories}
                        contentContainerStyle={styles.categoriesContainer}
                        renderItem={({ item }) => <CategoryItem
                            activeCategory={activeCategory}
                            category={item}
                            handleSelectCategory={handleSelectCategory} />
                        }
                    />
                }
            />


            <View style={{
                position: 'absolute',
                bottom: 20,
                right: 10,
                zIndex: 50
            }}>
                <AntDesign name="pluscircleo" size={40} color={colors.brightOrange} onPress={() => setIsModalOpen(true)} />
            </View>

            <NoteModal />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        paddingHorizontal: 12,
        flex: 1,
        position: 'relative'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    title: {
        color: colors.veryLightGray,
        fontSize: wp * 0.07,
    },

    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 15,
        height: wh * 0.05,
        marginBottom: 50,

    },

    notesContainer: {
        marginTop: 20,
        gap: 10,
        justifyContent: 'space-between',
    },

})