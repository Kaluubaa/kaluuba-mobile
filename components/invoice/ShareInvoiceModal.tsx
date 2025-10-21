import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Share,
  Platform,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '~/components/reusbales/Button';
import { useToast } from '~/context/ToastContext';

interface ShareInvoiceModalProps {
  visible: boolean;
  onClose: () => void;
  invoice: {
    title: string;
    currency: string;
    items: Array<{ amount: number; quantity: number }>;
    created_at: string;
    id: string;
  };
}

const ShareInvoiceModal: React.FC<ShareInvoiceModalProps> = ({ visible, onClose, invoice }) => {
  const shareLink = `https://kaluuba.vercel.app/invoice/${invoice?.id}`;
  const totalAmount = invoice?.items?.reduce((total, item) => total + item.amount * item.quantity, 0);
    const { showToast } = useToast()
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Invoice: ${invoice.title}\nAmount: ${invoice.currency} ${totalAmount}\nCreated: ${invoice.created_at}\n\nView invoice: ${shareLink}`,
        title: invoice.title,
      });
    } catch (error) {
      console.log('Error sharing invoice:', error);
    }
  };

  const handleCopyLink = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Clipboard.setString(shareLink);
    }

    showToast({ message: "copied", description: "Invoice link copied to clipboard", type: "success" })
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white justify-center items-center">
        <View className="w-[90%] py-5">
          <TouchableOpacity
            className="absolute top-0 right-0 p-6"
            onPress={onClose}
          >
            <Text className="font-jarkatamedium text-2xl text-gray-800">×</Text>
          </TouchableOpacity>

          <Text className="font-jarkatasemibold text-xl text-gray-900 text-center mb-4">
            Share Invoice
          </Text>
          <Text className="font-jarkatamedium text-sm text-gray-500 text-center mb-6">
            Scan this QR code to pay this invoice
          </Text>

          <View className="bg-white rounded-xl p-5 mb-6  items-center">
            <QRCode
              value={shareLink}
              size={200}
              backgroundColor="white"
              color="black"
            />
          </View>

          <View className="flex-row items-center mb-6 px-5">
            <Text className="flex-1 font-jarkatamedium text-sm text-gray-900" numberOfLines={1}>
              {shareLink}
            </Text>
            <TouchableOpacity
              onPress={handleCopyLink}
              className="bg-gray-100 rounded-xl px-3 py-2 ml-2"
            >
              <Text className="font-jarkatamedium text-sm text-gray-800">Copy</Text>
            </TouchableOpacity>
          </View>

          <Button onPress={handleShare} className="w-full">
            Share Externally
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ShareInvoiceModal;