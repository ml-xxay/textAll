interface TimeSlot {
  id?: string
  dictionaryId?: string
  valueCode?: string
  valueName?: string
  text?: string
  displayOrder?: number
  valueDescribe?: string
  valueMulticolor?: string
}

function timerInterval(
  arr: TimeSlot[]
): { index: number; timeSlot: TimeSlot; subsequentTimeSlots: TimeSlot[]; next: Boolean } | null {
  let newArr = JSON.parse(JSON.stringify(arr))

  const now = new Date()
  const currentHour = now.getHours()
  // 创建map  用code映射name
  const itemMap = new Map()
  newArr.forEach((item) => {
    itemMap.set(item.valueCode, item.text)
  })

  for (let i = 0; i < newArr.length; i++) {
    // const [startHourStr, endHourStr] = newArr[i].text.split('-') //TODO 做字典映射valueName  不直接用name

    const [startHourStr, endHourStr] = itemMap.get(newArr[i].valueCode).split('-') //映射

    const startHour = parseInt(startHourStr.split(':')[0], 10)
    const endHour = parseInt(endHourStr.split(':')[0], 10)

    if (currentHour < startHour) {
      return {
        index: i,
        next: true,
        timeSlot: newArr[i],
        subsequentTimeSlots: newArr.slice(i) //后续时间
      }
    }
  }
  // 如果没有找到匹配的时间段
  return {
    index: 0,
    next: false,
    timeSlot: newArr[0],
    subsequentTimeSlots: newArr.slice(0) //后续时间
  }
}

function timerHandle(data: TimeSlot[]): TimeSlot[] {
  return data.map((item) => ({
    ...item,
    text: item.valueName
  }))
}

export { timerInterval, timerHandle }
