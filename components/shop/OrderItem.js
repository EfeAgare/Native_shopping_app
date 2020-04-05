import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = (props) => {
  const { totalAmount, readableDate } = props.order;
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{readableDate}</Text>
      </View>
      <Button title='Show Details' color={Colors.primary} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
});
