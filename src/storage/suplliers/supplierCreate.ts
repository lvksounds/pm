import AsyncStorage from "@react-native-async-storage/async-storage";

import { SupplierControlDTO } from "./SupplierControlDTO";
import { SUPLLIERCONTROLL_COLLECTION } from "../StorageConfig";
import { supllierGetAll } from "./supplierGetAll";

export async function spendingCreate(newSpending: SupplierControlDTO) {
  try {
    const supplierControl = await supllierGetAll();

    const storage = [...supplierControl, newSpending];

    const data = await AsyncStorage.setItem(
      SUPLLIERCONTROLL_COLLECTION,
      JSON.stringify(storage)
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
