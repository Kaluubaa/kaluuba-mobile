// ItemRow.tsx
import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Controller, Control, FieldErrors, useWatch } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

// 👇 adjust to your form structure
export interface Item {
  description: string;
  quantity: number;
  price: number;
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
  const price = useWatch({
    control,
    name: `items.${index}.price`,
  });

  const amount = (quantity || 0) * (price || 0);

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

        {/* Price */}
        <Controller
          control={control}
          name={`items.${index}.price`}
          render={({ field: { onChange, value } }) => (
            <View className="w-24">
              <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
                Price
              </Text>
              <TextInput
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular text-sm"
                placeholder="1"
                keyboardType="number-pad"
                value={value?.toString() || ""}
                onChangeText={(text) => onChange(parseInt(text) || 0)}
              />
              {errors?.items?.[index]?.price && (
                <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                  {errors.items[index]?.price?.message as string}
                </Text>
              )}
            </View>
          )}
        />

        {/* Amount (auto-calculated) */}
        <View className="flex-1">
          <Text className="mb-2 font-jarkataregular text-sm text-gray-500">
            Amount
          </Text>
          <TextInput
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 font-jarkataregular text-sm"
            value={amount.toString()}
            editable={false}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemRow;
