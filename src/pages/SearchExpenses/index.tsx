import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Transactions, TextCard } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert, FlatList } from "react-native";
import { supllierGetAll } from "../../storage/suplliers/supplierGetAll";
import { SupplierControlDTO } from "../../storage/suplliers/SupplierControlDTO";
import { TransactionExpenses } from "../../components/TransactionExpenses";

export function SearchExpenses() {
  const [searchText, setSearchText] = useState("");
  const [dataExpenses, setDataExpenses] = useState<SupplierControlDTO[]>([]);
  const [addSupplier, setAddSupplier] = useState(0);
  // teste
  async function handleSearchSpending() {
    if (searchText.trim() === "") {
      return Alert.alert("Pesquisa de Gastos", "Favor insira um valor");
    }
    const data = await supllierGetAll();
    const newData = data.filter(
      (item) =>
        item.taxId === searchText.trim() || item.supplier === searchText.trim()
    );

    function Calculate(total: number, item: SupplierControlDTO) {
      return total + item.taxValue;
    }

    const soma = newData.filter((item) => item.taxValue).reduce(Calculate, 0);

    setAddSupplier(soma);
    setDataExpenses(newData);
    setSearchText("");
  }

  return (
    <Container>
      <Header title="Consulta" />

      <Input
        placeholder="Código Imposto ou Fornecedor"
        placeholderTextColor="#363F5F"
        value={searchText}
        onChangeText={(value) => setSearchText(value)}
      />

      <Button title="Pesquisa" onPress={handleSearchSpending} />

      {addSupplier != 0 && (
        <TextCard>{`Total de Gastos: R$ ${addSupplier}`}</TextCard>
      )}

      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
        />
      </Transactions>
    </Container>
  );
}
