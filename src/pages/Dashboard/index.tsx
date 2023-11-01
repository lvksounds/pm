import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { InputAmount } from "../../components/InputAmount";
import { InputDate } from "../../components/InputDate";
import { spendingCreate } from "../../storage/suplliers/supplierCreate";
import { supllierGetAll } from "../../storage/suplliers/supplierGetAll";
import { formatAmount } from "../../utils/formatAmount";
import { ValidateTaxCodes } from "../../utils/validateTaxCodes";

export function Dashboard() {
  const [fiscalNote, setFiscalNote] = useState("");
  const [fiscalNoteDate, setFiscalNoteDate] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");

  async function handleAddNewSpending() {
    //limpa o AsyncStorage no android
    // await AsyncStorage.clear();
    // alert("O programa sera finalizado");
    // return;

    const taxIdValidated = ValidateTaxCodes(taxId);

    if (!taxIdValidated) {
      return Alert.alert(
        "Codigo do imposto inválido!",
        "Por favor certifique-se de digitar um codigo valido para a nota fiscal."
      );
    }

    const data = {
      fiscalNote,
      product,
      fiscalNoteDate,
      taxValue: formatAmount(taxValue),
      taxId: taxIdValidated ? taxId : "",
      supplier,
    };
    await spendingCreate(data);
    setFiscalNote("");
    setFiscalNoteDate("");
    setTaxId("");
    setTaxValue("");
    setSupplier("");
    setProduct("");
    const result = await supllierGetAll();

    return Alert.alert("Transação adicionada com sucesso!");
  }

  return (
    <Container>
      <Header title="Controle de Fornecedores" />

      <Input
        placeholder="Codigo NF"
        placeholderTextColor="#363F5F"
        value={fiscalNote}
        onChangeText={(value) => setFiscalNote(value)}
      />

      <Input
        placeholder="Produto"
        placeholderTextColor="#363F5F"
        value={product}
        onChangeText={(value) => setProduct(value)}
      />

      <InputDate
        placeholder="Data da NF"
        placeholderTextColor="#363F5F"
        value={fiscalNoteDate}
        onChangeText={(value) => setFiscalNoteDate(value)}
      />

      <Input
        placeholder="Codigo do Imposto"
        placeholderTextColor="#363F5F"
        value={taxId}
        onChangeText={(value) => setTaxId(value)}
      />

      <InputAmount
        placeholder="Valor do Imposto"
        placeholderTextColor="#363F5F"
        value={taxValue}
        onChangeText={(value) => setTaxValue(value)}
      />

      <Input
        placeholder="Fornecedor do produto"
        placeholderTextColor="#363F5F"
        value={supplier}
        onChangeText={(value) => setSupplier(value)}
      />

      <Button title="Adicionar" onPress={handleAddNewSpending} />
    </Container>
  );
}
