export const formatFormItemAll = (baseData, dictData, areaData) => {
  return [
    // 基本数据
    {
      field: 'fullMachineSerialNumber',
      type: 'input',
      label: '整机编号',
      placeholder: '请输入整机编号',
      active: false
    },
    {
      field: 'area',
      type: 'select',
      label: '区域',
      placeholder: '请选择区域',
      active: false,
      options: filterBaseArea(areaData)
    },
    {
      field: 'singleUnitCapacityMw',
      type: 'select',
      label: '单机容量(MW)',
      placeholder: '请选择单机容量',
      active: false,
      options: filterBaseData(BASE_TYPE.singleUnitCapacityMw, baseData)
    },
    {
      field: 'projectLocation',
      type: 'input',
      label: '项目地',
      placeholder: '请输入项目地',
      active: false
    },
    {
      field: 'fullMachineVersion',
      type: 'input',
      label: '整机版本',
      placeholder: '请输入整机版本',
      active: false
    },
    // 整机
    {
      field: 'fullMachineAnticorrosiveLevel',
      type: 'select',
      label: '整机防腐等级',
      placeholder: '请选择整机防腐等级',
      active: false,
      options: filterBaseData(
        BASE_TYPE.fullMachineAnticorrosiveLevel,
        baseData
      )
    },
    {
      field: 'fullMachineInterlocking',
      type: 'select',
      label: '整机互锁',
      placeholder: '请选择整机互锁',
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineInterlocking, baseData)
    },
    // 逆变器
    {
      field: 'inverterMaterialNumber',
      type: 'input',
      label: '逆变器料号',
      placeholder: '请输入逆变器料号',
      active: false
    },
    {
      field: 'inverterDcInputChannels',
      type: 'input',
      label: '逆变器直流输入路数',
      placeholder: '请输入逆变器直流输入路数',
      active: false
    },
    {
      field: 'inverterNegativeGroundFloat',
      type: 'select',
      label: '逆变器负极接地或浮地',
      placeholder: '请选择逆变器负极接地或浮地',
      active: false,
      options: filterBaseData(BASE_TYPE.inverterNegativeGroundFloat, baseData)
    },
    {
      field: 'inverterFuseSpecification',
      type: 'input',
      label: '逆变器熔丝规格',
      placeholder: '请输入逆变器熔丝规格',
      active: false
    },
    {
      field: 'inverterDcPlc',
      type: 'select',
      label: '逆变器直流PLC',
      placeholder: '请选择逆变器直流PLC',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterDcPlc, dictData)
    },
    {
      field: 'inverterOffGridTuning',
      type: 'select',
      label: '逆变器离网调试',
      placeholder: '请选择逆变器离网调试',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterOffGridTuning, dictData)
    },
    {
      field: 'inverterStorageInterface',
      type: 'select',
      label: '逆变器储能接口',
      placeholder: '请选择逆变器储能接口',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterStorageInterface, dictData)
    },
    {
      field: 'inverterNightSvg',
      type: 'select',
      label: '逆变器夜间SVG',
      placeholder: '请选择逆变器夜间SVG',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterNightSvg, dictData)
    },
    // 配电柜
    {
      field: 'pdCabinetMaterialNumber',
      type: 'input',
      label: '配电柜料号',
      placeholder: '请输入配电柜料号',
      active: false
    },
    {
      field: 'pdCabinetAuxTransformerSpec',
      type: 'input',
      label: '配电柜辅变规格',
      placeholder: '请输入配电柜辅变规格',
      active: false
    },
    {
      field: 'pdCabinetSwitch',
      type: 'select',
      label: '配电柜交换机',
      placeholder: '请选择配电柜交换机',
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetSwitch, baseData)
    },
    {
      field: 'pdCabinetTerminalBox',
      type: 'select',
      label: '配电柜终端盒',
      placeholder: '请选择配电柜终端盒',
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetTerminalBox, baseData)
    },
    {
      field: 'pdCabinetPanoramicMonitoring',
      type: 'select',
      label: '配电柜全景监控',
      placeholder: '请选择配电柜全景监控',
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetPanoramicMonitoring, baseData)
    },
    {
      field: 'pdCabinetAcIsolation',
      type: 'select',
      label: '配电柜交流ISO',
      placeholder: '请选择配电柜交流ISO',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.pdCabinetAcIsolation, dictData)
    },
    {
      field: 'pdCabinetElectricMeter',
      type: 'select',
      label: '配电柜电表',
      placeholder: '请选择配电柜电表',
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetElectricMeter, baseData)
    },
    // 变压器
    {
      field: 'transformerMaterialNumber',
      type: 'input',
      label: '变压器料号',
      placeholder: '请输入变压器料号',
      active: false
    },
    {
      field: 'transformerType',
      type: 'select',
      label: '变压器类型',
      placeholder: '请选择变压器类型',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformerType, dictData)
    },
    {
      field: 'transformerVoltageKv',
      type: 'input',
      label: '变压器电压',
      placeholder: '请输入变压器电压 kV',
      active: false
    },
    {
      field: 'ringMainUnitMaterialNumber',
      type: 'input',
      label: '环网柜料号',
      placeholder: '请输入环网柜料号',
      active: false
    },
    {
      field: 'rmUnitVoltageKv',
      type: 'input',
      label: '环网柜电压 kV',
      placeholder: '请输入环网柜电压 kV',
      active: false
    },
    {
      field: 'rmUnitOverallInterlock',
      type: 'select',
      label: '环网柜整机互锁',
      placeholder: '请选择环网柜整机互锁',
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitOverallInterlock, baseData)
    },
    // 无权重
    {
      field: 'fullMachineTemperature',
      type: 'input',
      label: '整机温度',
      placeholder: '请输入整机温度',
      active: false
    },
    {
      field: 'fullMachineAltitude',
      type: 'input',
      label: '整机海拔',
      placeholder: '请输入整机海拔',
      active: false
    },
    {
      field: 'fullMachineProtectionRating',
      type: 'input',
      label: '整机防护等级',
      placeholder: '请输入整机防护等级',
      active: false
    },
    {
      field: 'fullMachineColor',
      type: 'select',
      label: '整机颜色',
      placeholder: '请选择整机颜色',
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineColor, baseData)
    },
    {
      field: 'fullMachineLanguage',
      type: 'select',
      label: '整机小语言',
      placeholder: '请选择整机小语言',
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineLanguage, baseData)
    },
    {
      field: 'fullMachineTempControlHeat',
      type: 'input',
      label: '整机温度控制加热',
      placeholder: '请输入整机温度控制加热',
      active: false
    },
    {
      field: 'fullMachineTestTerminals',
      type: 'input',
      label: '整机测试端子',
      placeholder: '请输入整机测试端子',
      active: false
    },
    {
      field: 'fullMachineEmergencyStop',
      type: 'select',
      label: '整机急停',
      placeholder: '请选择整机急停',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.fullMachineEmergencyStop, dictData)
    },
    {
      field: 'fullMachineLoTo',
      type: 'input',
      label: '整机LOTO',
      placeholder: '请输入整机LOTO',
      active: false
    },
    {
      field: 'fullMachineOilReservoir',
      type: 'input',
      label: '整机油槽',
      placeholder: '请输入整机油槽',
      active: false
    },
    {
      field: 'fullMachineSunshadeMountHole',
      type: 'input',
      label: '整机遮阳棚安装孔',
      placeholder: '请输入整机遮阳棚安装孔',
      active: false
    },
    {
      field: 'fullMachineFirewall',
      type: 'input',
      label: '整机防火墙',
      placeholder: '请输入整机防火墙',
      active: false
    },
    {
      field: 'fullMachineIntegratedPlatform',
      type: 'input',
      label: '整机一体化平台',
      placeholder: '请输入整机一体化平台',
      active: false
    },
    {
      field: 'fullMachineDifferentProtect',
      type: 'input',
      label: '整机差动保护',
      placeholder: '请输入整机差动保护',
      active: false
    },
    {
      field: 'fullMachineOtherNonStandard',
      type: 'input',
      label: '整机其他非标',
      placeholder: '请输入整机其他非标',
      active: false
    },
    {
      field: 'inverterSelfDischargeVoltage',
      type: 'input',
      label: '逆变器直流电压',
      placeholder: '请输入逆变器直流电压',
      active: false
    },
    {
      field: 'inverterMpptChannels',
      type: 'input',
      label: '逆变器MPPT路数',
      placeholder: '请输入逆变器MPPT路数',
      active: false
    },
    {
      field: 'inverterDcBreakerLoadSwitch',
      type: 'input',
      label: '逆变器直流断路器负荷开关',
      placeholder: '请输入逆变器直流断路器负荷开关',
      active: false
    },
    {
      field: 'inverterDcCableClamp',
      type: 'select',
      label: '逆变器直流线缆固定夹',
      placeholder: '请选择逆变器直流线缆固定夹',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterDcCableClamp, dictData)
    },
    {
      field: 'inverterPidControl',
      type: 'input',
      label: '逆变器PID',
      placeholder: '请输入逆变器PID',
      active: false
    },
    {
      field: 'inverterDcLightningProtection',
      type: 'select',
      label: '逆变器直流防雷',
      placeholder: '请选择逆变器直流防雷',
      active: false,
      options: filterBaseData(
        BASE_TYPE.inverterDcLightningProtection,
        baseData
      )
    },
    {
      field: 'inverterAcLightningProtection',
      type: 'select',
      label: '逆变器交流防雷',
      placeholder: '请选择逆变器交流防雷',
      active: false,
      options: filterBaseData(
        BASE_TYPE.inverterAcLightningProtection,
        baseData
      )
    },
    {
      field: 'inverterLowVoltagePowerPort',
      type: 'select',
      label: '逆变器低压取电接口',
      placeholder: '请选择逆变器低压取电接口',
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.inverterLowVoltagePowerPort,
        dictData
      )
    },
    {
      field: 'inverterAcVoltage',
      type: 'input',
      label: '逆变器交流电压',
      placeholder: '请输入逆变器交流电压',
      active: false
    },
    {
      field: 'inverterAcSwitch',
      type: 'input',
      label: '逆变器交流开关',
      placeholder: '请输入逆变器交流开关',
      active: false
    },
    {
      field: 'inverterAcOutputLine',
      type: 'select',
      label: '逆变器交流出线',
      placeholder: '请选择逆变器交流出线',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterAcOutputLine, dictData)
    },
    {
      field: 'inverterHeater',
      type: 'select',
      label: '逆变器加热器',
      placeholder: '请选择逆变器加热器',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterHeater, dictData)
    },
    {
      field: 'inverterChannels',
      type: 'input',
      label: '逆变器路数',
      placeholder: '请输入逆变器路数',
      active: false
    },
    {
      field: 'inverterPvvSg',
      type: 'input',
      label: '逆变器PVV SG',
      placeholder: '请输入逆变器PVV SG',
      active: false
    },
    {
      field: 'inverterBlackStart',
      type: 'input',
      label: '逆变器黑启动',
      placeholder: '请输入逆变器黑启动',
      active: false
    },
    // 配电柜
    {
      field: 'pdCabinetMcb',
      type: 'input',
      label: '配电柜微断',
      placeholder: '请输入配电柜微断',
      active: false
    },
    {
      field: 'pdCabinetOutlet',
      type: 'input',
      label: '配电柜插座',
      placeholder: '请输入配电柜插座',
      active: false
    },
    {
      field: 'pdCabinetLightningProtection',
      type: 'input',
      label: '配电柜防雷',
      placeholder: '请输入配电柜防雷',
      active: false
    },
    {
      field: 'pdCabinetUps',
      type: 'input',
      label: '配电柜UPS',
      placeholder: '请输入配电柜UPS',
      active: false
    },
    {
      field: 'pdCabinetUpsMonitoring',
      type: 'input',
      label: '配电柜UPS监控',
      placeholder: '请输入配电柜UPS监控',
      active: false
    },
    {
      field: 'pdCabinetOutdoor',
      type: 'input',
      label: '配电柜户外配电柜',
      placeholder: '请输入配电柜户外配电柜',
      active: false
    },
    {
      field: 'transformerBrand',
      type: 'select',
      label: '变压器品牌',
      placeholder: '请选择变压器品牌',
      active: false,
      options: filterBaseData(BASE_TYPE.transformerBrand, baseData)
    },
    {
      field: 'transformerCapacityKva',
      type: 'input',
      label: '变压器容量',
      placeholder: '请输入变压器容量',
      active: false
    },
    {
      field: 'transformerMaterial',
      type: 'select',
      label: '变压器材质',
      placeholder: '请选择变压器材质',
      active: false,
      options: filterBaseData(BASE_TYPE.transformerMaterial, baseData)
    },
    {
      field: 'transformerFrequencyHz',
      type: 'input',
      label: '变压器频率',
      placeholder: '请输入变压器频率',
      active: false
    },
    {
      field: 'transformerEfficiency',
      type: 'input',
      label: '变压器效率',
      placeholder: '请输入变压器效率',
      active: false
    },
    {
      field: 'transformerOil',
      type: 'select',
      label: '变压器油',
      placeholder: '请选择变压器油',
      active: false,
      options: filterBaseData(BASE_TYPE.transformerOil, baseData)
    },
    {
      field: 'transformerWindingTemperature',
      type: 'select',
      label: '变压器绕组温度',
      placeholder: '请选择变压器绕组温度',
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.transformerWindingTemperature,
        dictData
      )
    },
    {
      field: 'transformerAnticorrosiveLevel',
      type: 'select',
      label: '变压器防腐等级',
      placeholder: '请选择变压器防腐等级',
      active: false,
      options: filterBaseData(
        BASE_TYPE.transformerAnticorrosiveLevel,
        baseData
      )
    },
    {
      field: 'transformerColor',
      type: 'select',
      label: '变压器颜色',
      placeholder: '请选择变压器颜色',
      active: false,
      options: filterBaseData(BASE_TYPE.transformerColor, baseData)
    },
    {
      field: 'transformer11Overvoltage',
      type: 'select',
      label: '变压器1.1倍过压',
      placeholder: '请选择变压器1.1倍过压',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformer11Overvoltage, dictData)
    },
    {
      field: 'transformerBrandAssign',
      type: 'select',
      label: '变压器品牌指定',
      placeholder: '请选择变压器品牌指定',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformerBrandAssign, dictData)
    },
    {
      field: 'transformerHeatUpgradePaper',
      type: 'input',
      label: '变压器热升级纸',
      placeholder: '请输入变压器热升级纸',
      active: false
    },
    {
      field: 'transformerLockingDevice',
      type: 'input',
      label: '变压器加锁',
      placeholder: '请输入变压器加锁',
      active: false
    },
    {
      field: 'transformerOilGasCollector',
      type: 'input',
      label: '变压器集气盒',
      placeholder: '请输入变压器集气盒',
      active: false
    },
    {
      field: 'transformerBrazilStandard',
      type: 'input',
      label: '变压器巴西标',
      placeholder: '请输入变压器巴西标',
      active: false
    },
    {
      field: 'transformerConnectionGroup',
      type: 'input',
      label: '变压器联结组别',
      placeholder: '请输入变压器联结组别',
      active: false
    },
    {
      field: 'transformerLoadSwitchOperate',
      type: 'input',
      label: '变压器负荷开关+电操',
      placeholder: '请输入变压器负荷开关+电操',
      active: false
    },
    {
      field: 'transformerBushingTube',
      type: 'input',
      label: '变压器引流管',
      placeholder: '请输入变压器引流管',
      active: false
    },
    {
      field: 'transformerSpecialHeatRise',
      type: 'input',
      label: '变压器特殊温升',
      placeholder: '请输入变压器特殊温升',
      active: false
    },
    {
      field: 'transformerFragmentedFixed',
      type: 'input',
      label: '变压器片散固定',
      placeholder: '请输入变压器片散固定',
      active: false
    },
    {
      field: 'transformerCoreShieldGround',
      type: 'input',
      label: '变压器铁芯&屏蔽层接地',
      placeholder: '请输入变压器铁芯&屏蔽层接地',
      active: false
    },
    {
      field: 'transformerFourPosition',
      type: 'input',
      label: '变压器四工位',
      placeholder: '请输入变压器四工位',
      active: false
    },
    {
      field: 'transformerInsulationLevel',
      type: 'input',
      label: '变压器绝缘水平',
      placeholder: '请输入变压器绝缘水平',
      active: false
    },
    {
      field: 'transformerHighVoltageInput',
      type: 'input',
      label: '变压器高压进线',
      placeholder: '请输入变压器高压进线',
      active: false
    },
    {
      field: 'transformerOtherNonStandard',
      type: 'input',
      label: '变压器其他非标',
      placeholder: '请输入变压器其他非标',
      active: false
    },
    {
      field: 'transformerMediumVoltageCable',
      type: 'input',
      label: '变压器中压电缆',
      placeholder: '请输入变压器中压电缆',
      active: false
    },
    {
      field: 'rmUnitBrand',
      type: 'select',
      label: '环网柜品牌',
      placeholder: '请选择环网柜品牌',
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitBrand, baseData)
    },
    {
      field: 'rmUnitCabinetType',
      type: 'select',
      label: '环网柜柜型',
      placeholder: '请选择环网柜柜型',
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitCabinetType, baseData)
    },
    {
      field: 'rmUnitFrequencyHz',
      type: 'input',
      label: '环网柜频率 Hz',
      placeholder: '请输入环网柜频率 Hz',
      active: false
    },
    {
      field: 'rmUnitShortTimeWithstand',
      type: 'input',
      label: '环网柜短耐',
      placeholder: '请输入环网柜短耐',
      active: false
    },
    {
      field: 'rmUnitElectricalOperation',
      type: 'select',
      label: '环网柜电操',
      placeholder: '请选择环网柜电操',
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.rmUnitElectricalOperation,
        dictData
      )
    },
    {
      field: 'rmUnitArcExtinguishing',
      type: 'select',
      label: '环网柜燃弧',
      placeholder: '请选择环网柜燃弧',
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitArcExtinguishing, baseData)
    },
    {
      field: 'rmUnitUpDownInterlock',
      type: 'select',
      label: '环网柜上下游互锁',
      placeholder: '请选择环网柜上下游互锁',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitUpDownInterlock, dictData)
    },
    {
      field: 'rmUnitLowPressureAlarm',
      type: 'select',
      label: '环网柜低气压报警信号',
      placeholder: '请选择环网柜低气压报警信号',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitLowPressureAlarm, dictData)
    },
    {
      field: 'rmUnitProtectionrelay',
      type: 'input',
      label: '环网柜继保',
      placeholder: '请输入环网柜继保',
      active: false
    },
    {
      field: 'rmUnitCommunication',
      type: 'select',
      label: '环网柜通讯',
      placeholder: '请选择环网柜通讯',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitCommunication, dictData)
    },
    {
      field: 'rmUnitCtParameters',
      type: 'select',
      label: '环网柜互感器参数',
      placeholder: '请选择环网柜互感器参数',
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitCtParameters, baseData)
    },
    {
      field: 'rmUnitOutdoor',
      type: 'select',
      label: '环网柜户外',
      placeholder: '请选择环网柜户外',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitOutdoor, dictData)
    },
    {
      field: 'rmUnitBrandAssign',
      type: 'input',
      label: '环网柜品牌指定',
      placeholder: '请输入环网柜品牌指定',
      active: false
    },
    {
      field: 'rmUnitUndervoltageTrip',
      type: 'input',
      label: '环网柜欠压脱扣',
      placeholder: '请输入环网柜欠压脱扣',
      active: false
    },
    {
      field: 'rmUnitRemoteSwitching',
      type: 'input',
      label: '环网柜远程分合闸',
      placeholder: '请输入环网柜远程分合闸',
      active: false
    },
    {
      field: 'rmUnitTemperatureControl',
      type: 'input',
      label: '环网柜温度控制',
      placeholder: '请输入环网柜温度控制',
      active: false
    },
    {
      field: 'rmUnitGroundFaultIndicator',
      type: 'input',
      label: '环网柜接地故障指示器',
      placeholder: '请输入环网柜接地故障指示器',
      active: false
    },
    {
      field: 'rmUnitFaultSignalUpload',
      type: 'select',
      label: '环网柜继保故障信号上传',
      placeholder: '请选择环网柜继保故障信号上传',
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitFaultSignalUpload, dictData)
    },
    {
      field: 'rmUnitOtherNonStandard',
      type: 'input',
      label: '环网柜其他非标',
      placeholder: '请输入环网柜其他非标',
      active: false
    },
    {
      field: 'rmUnitLightningArrester',
      type: 'input',
      label: '环网柜避雷器',
      placeholder: '请输入环网柜避雷器',
      active: false
    },
    {
      field: 'rmUnitInsulatingCap',
      type: 'input',
      label: '环网柜绝缘帽',
      placeholder: '请输入环网柜绝缘帽',
      active: false
    },
  ]
}

// 筛选基本数据
const filterBaseData = (type, baseData) => {
  return baseData[type]
}

// 筛选字段数据
const filterBaseDataDict = (type, baseDataDict) => {
  // 首先获取dictionaryValues
  const it = baseDataDict.find((item) => item.dictionaryCode === type)

  // 然后映射转换每一个对象
  const formattedValues = it.dictionaryValues.map((item) => ({
    title: item.valueName,
    value: item.valueCode
  }))

  return formattedValues
}

// 筛选区域
const filterBaseArea = (baseDataArea) => {
  const areaArr = baseDataArea.map(item => ({
    title: item.area,
    value: item.area
  }))

  return areaArr
}