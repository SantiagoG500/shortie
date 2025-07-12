import { SelectLinks } from '@/db/db-schemas';
import { appDomain } from '@/routes';
import { addToast } from '@heroui/react';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useTransition } from 'react';

type useQR = {
  link: SelectLinks,
  isModalOpen: boolean
}

export function useQR({ link, isModalOpen }: useQR) {
  const [ isPending, startTransition ] = useTransition()
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCode = new QRCodeStyling({
    width: 150,
    height: 150,
    data: `${appDomain}${link.slug}`,
    dotsOptions: {
        color: "#33CAFF",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#27272a",
    },
  });

  const handleDownload = () => {
    try {
      qrCode.download({ name: `qr-${link.slug}`, extension: 'png' })

      addToast({
        title: `QR downloaded succesfully: ${link.slug}`,
        description: link.url,
        color: 'success'
      })
    } catch (error) {
      addToast({
        title: `Something went wrong`,
        description: `We were not able to download "${link.slug}". Try again later.`,
        color: 'danger'
      })
    }
  }
  
  const handleCopy = async () => {
    try {
      const rawData = await qrCode.getRawData()
      if (!rawData) return

      let blob: Blob = rawData instanceof Blob
        ? rawData
        : new Blob([rawData], { type: 'img/png' })

      const clipboardItem = new ClipboardItem({
        [blob.type]: blob
      })

      await navigator.clipboard.write([ clipboardItem ])

      addToast({
        title: `QR copied succesfully: ${link.slug}`,
        description: link.url,
        color: 'success'
      })
    } catch (error) {
      addToast({
        title: `Something went wrong`,
        description: `We were not able to copy "${link.slug}". Try again later.`,
        color: 'danger'
      })
    }
  }

  useEffect(()=> {
    if (qrRef.current && isModalOpen) { 
      qrCode.append(qrRef.current)
    }
  }, [isModalOpen])


  return  {
    handleDownload,
    handleCopy,
    isPending,
    startTransition,
    qrRef
  }
}