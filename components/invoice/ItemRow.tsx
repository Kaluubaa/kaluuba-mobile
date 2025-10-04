// ItemRow.tsx
import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Controller, Control, FieldErrors, useWatch } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

// 👇 adjust to your form structure
export interface Item {
  name: string;
  description: string;
  quantity: number;
  amount: number;
}

interface ItemRowProps {
  control: Control<{ items: Item[] }> | any;
  index: number;
  field: { id: string };
  remove?: (index: number) => void;
  errors: FieldErrors<{ items: Item[] }>;
}

const ItemRow: React.FC<ItemRowProps> = ({ control, index, field, remove, errors }) => {
  // ✅ hooks are safe here
  const quantity = useWatch({
    control,
    name: `items.${index}.quantity`,
  });
  const amount = useWatch({
    control,
    name: `items.${index}.amount`,
  });

  return (
    <View className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-jarkatamedium text-sm text-gray-500">
          Item {index + 1}
        </Text>
        {remove && (
          <Pressable
            onPress={() => remove(index)}
            className="rounded-full bg-red-100 p-2"
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </Pressable>
        )}
      </View>

      {/* Name */}
      <Controller
        control={control}
        name={`items.${index}.name`}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
              Item Name
            </Text>
            <TextInput
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular text-sm"
              placeholder="Enter item name"
              value={value}
              onChangeText={onChange}
            />
            {errors?.items?.[index]?.name && (
              <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                {errors.items[index]?.name?.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {/* Description */}
      <Controller
        control={control}
        name={`items.${index}.description`}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
              Description
            </Text>
            <TextInput
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular text-sm"
              placeholder="Enter item description"
              value={value}
              onChangeText={onChange}
            />
            {errors?.items?.[index]?.description && (
              <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                {errors.items[index]?.description?.message as string}
              </Text>
            )}
          </View>
        )}
      />

      <View className="flex-row gap-4">
        {/* Quantity */}
        <Controller
          control={control}
          name={`items.${index}.quantity`}
          render={({ field: { onChange, value } }) => (
            <View className="w-24">
              <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
                Quantity
              </Text>
              <TextInput
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular text-sm"
                placeholder="1"
                keyboardType="number-pad"
                value={value?.toString() || ""}
                onChangeText={(text) => onChange(parseInt(text) || 0)}
              />
              {errors?.items?.[index]?.quantity && (
                <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                  {errors.items[index]?.quantity?.message as string}
                </Text>
              )}
            </View>
          )}
        />

        {/* Amount */}
        <Controller
          control={control}
          name={`items.${index}.amount`}
          render={({ field: { onChange, value } }) => (
            <View className="flex-1">
              <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
                Amount
              </Text>
              <TextInput
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular text-sm"
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={value?.toString() || ""}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
              />
              {errors?.items?.[index]?.amount && (
                <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                  {errors.items[index]?.amount?.message as string}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ItemRow;
