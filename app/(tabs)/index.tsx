import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/style/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { wh, wp } from '@/style/common'
import { notes } from '@/data/category'
import { truncateText } from '@/utils/truncateText';
import Entypo from '@expo/vector-icons/Entypo';
import { setIsModalOpen } from '@/store/features/notes/actions';
import NoteModal from '@/components/Modal';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getUserDocument } from '@/utils/getUserDocument';
type categories = {
    title: string,
    amount?: number
}
type notes = {
    category: string,
    note: string,
    title: string
}
const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const currentUser: FirebaseAuthTypes.User | null = auth().currentUser
    const [userNotes, setUserNotes] = useState<[] | notes[]>([])
    const [userCategories, setUserCategories] = useState<categories[] | []>([])
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
            const userCategories = userData?.notes?.map((item: notes) => item?.category)

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

            setUserNotes(userNotes as notes[])
        }
    }
    console.log('categoriessssss', userCategories);

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
                renderItem={({ item }) => <View style={styles.noteItem}>
                    <View style={styles.note_header}>
                        <Text style={styles.noteCategory}>{item?.category}</Text>
                        <Entypo name="dots-three-horizontal" size={24} color={colors.brightOrange} />
                    </View>
                    <Text style={styles.noteCategoryText}>{truncateText(item?.note, 300)}</Text>
                </View>}

                ListHeaderComponent={/*Categories */
                    <FlatList
                        horizontal
                        data={userCategories}
                        contentContainerStyle={styles.categoriesContainer}
                        renderItem={({ item }) => <TouchableOpacity
                            onPress={() => handleSelectCategory(item.title)}
                            style={[styles.categoryItem, activeCategory == item.title ? styles.activeCategoryItem : styles.inactiveCategoryItem]}>
                            <Text style={[styles.categoryText, activeCategory == item.title ? styles.activeCategoryText : styles.inactiveCategoryText]}>{item.title}</Text>
                            {
                                item?.amount && (
                                    <View style={styles.categoryAmountContainer}>
                                        <Text style={styles.categoryAmount}>{item?.amount}</Text>
                                    </View>
                                )
                            }
                        </TouchableOpacity>}
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
    activeCategoryItem: {
        borderColor: colors.brightOrange,
    },
    inactiveCategoryItem: {
        borderColor: colors.lightGray,
    },
    categoryItem: {
        borderWidth: 1,
        width: wp * 0.3,
        height: wh * 0.05,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,


    },
    activeCategoryText: {
        color: colors.brightOrange,
    },
    inactiveCategoryText: {
        color: colors.veryLightGray
    },
    categoryText: {},
    categoryAmountContainer: {
        backgroundColor: colors.mediumGray,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    categoryAmount: {
        color: colors.veryLightGray,
    },
    notesContainer: {
        marginTop: 20,
        gap: 10,
        justifyContent: 'space-between',
    },

    noteItem: {
        width: '47%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: wh * 0.3,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        gap: 10,
    },
    note_header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteCategory: {
        color: colors.brightOrange,
        fontSize: 10,
    },
    noteCategoryText: {
        color: colors.veryLightGray,
    },
})