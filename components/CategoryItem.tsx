import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/style/colors'
import { wh, wp } from '@/style/common'


type Props = {
    category : category
    handleSelectCategory : (category:  string) => void,
    activeCategory : string
}
const CategoryItem : React.FC<Props> = ({category, handleSelectCategory, activeCategory}) => {
    return (
        <TouchableOpacity
            onPress={() => handleSelectCategory(category.title)}
            style={[styles.categoryItem, activeCategory == category.title ? styles.activeCategoryItem : styles.inactiveCategoryItem]}>
            <Text style={[styles.categoryText, activeCategory == category.title ? styles.activeCategoryText : styles.inactiveCategoryText]}>{category.title}</Text>
            {
                category?.amount && (
                    <View style={styles.categoryAmountContainer}>
                        <Text style={styles.categoryAmount}>{category?.amount}</Text>
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
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
})