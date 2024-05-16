export const BASE_TYPE = {
  area: "", // 区域
  projectLocation: "", // 项目地
  singleUnitCapacityMw: "COM_MACHINE_CAPACITY", // 单机容量（MW）
  fullMachineSerialNumber: "", // 整机编号
  fullMachineVersion: "", // 整机版本
  fullMachineTemperature: "", // 整机温度
  fullMachineAltitude: "", // 整机海拔
  fullMachineProtectionRating: "", // 整机防护等级
  fullMachineAnticorrosiveLevel: "COM_MACHINE_ACZOILING_LEVEL", // 整机防腐等级
  fullMachineColor: "COM_MACHINE_COLOR", // 整机颜色
  fullMachineLanguage: "COM_MACHINE_LANGUAGE", // 整机小语言
  fullMachineTempControlHeat: "", // 整机温度控制加热
  fullMachineInterlocking: "COM_MACHINE_LOCK", // 整机互锁
  fullMachineTestTerminals: "", // 整机测试端子
  fullMachineEmergencyStop: "dic_mathine_stop", // 整机急停                  --> 字典项
  fullMachineLoTo: "", // 整机LOTO
  fullMachineOilReservoir: "", // 整机油槽
  fullMachineSunshadeMountHole: "", // 整机遮阳棚安装孔
  fullMachineFirewall: "", // 整机防火墙
  fullMachineIntegratedPlatform: "", // 整机一体化平台
  fullMachineDifferentProtect: "", // 整机差动保护
  fullMachineOtherNonStandard: "", // 整机其他非标
  inverterMaterialNumber: "", // 逆变器料号
  inverterSelfDischargeVoltage: "", // 逆变器自流电压
  inverterDcInputChannels: "", // 逆变器直流输入路数
  inverterMpptChannels: "", // 逆变器MPPT路数
  inverterFuseSpecification: "", // 逆变器熔丝规格
  inverterNegativeGroundFloat: "INVERTER_NEGATIVE_GROUND", // 逆变器负极接地或浮地
  inverterDcBreakerLoadSwitch: "", // 逆变器直流断路器负荷开关
  inverterDcCableClamp: "dic_inverter_dc_clip", // 逆变器直流线缆固定夹               --> 字典项
  inverterPidControl: "", // 逆变器PID
  inverterDcLightningProtection: "INVERTER_DC_MINE", // 逆变器直流防雷
  inverterAcLightningProtection: "INVERTER_AC_MINE", // 逆变器交流防雷
  inverterDcPlc: "dic_inverter_dc_plc", // 逆变器直流PLC                            --> 字典项
  inverterOffGridTuning: "dic_inverter_grid_debug", // 逆变器离网调试                --> 字典项
  inverterStorageInterface: "dic_inverter_interface", // 逆变器储能接口              --> 字典项
  inverterLowVoltagePowerPort: "dic_inverter_voltage_interface", // 逆变器低压取电接口   --> 字典项
  inverterAcVoltage: "", // 逆变器交流电压
  inverterAcSwitch: "", // 逆变器交流开关
  inverterAcOutputLine: "dic_inverter_output_line", // 逆变器交流出线
  inverterNightSvg: "dic_inverter_svg", // 逆变器夜间SVG
  inverterHeater: "dic_inverter_heater", // 逆变器加热器
  inverterChannels: "", // 逆变器路数
  inverterSnowMelting: "", // 逆变器融雪
  inverterPvvSg: "", // 逆变器PVV SG
  inverterBlackStart: "", // 逆变器黑启动
  pdCabinetMaterialNumber: "", // 配电柜料号

  rmUnitInsulatingCap: "", // 环网柜绝缘帽
  rmUnitLightningArrester: "", // 环网柜避雷器
  rmUnitOtherNonStandard: "", // 环网柜其他非标
  rmUnitFaultSignalUpload: "dic_electric_relay_production", // 环网柜继保故障信号上传
  rmUnitGroundFaultIndicator: "", // 环网柜接地故障指示器
  rmUnitTemperatureControl: "", // 环网柜温度控制
  rmUnitRemoteSwitching: "", // 环网柜远程分合闸
  rmUnitUndervoltageTrip: "", // 环网柜欠压脱扣
  rmUnitBrandAssign: "", // 环网柜品牌指定
  rmUnitOutdoor: "dic_electric_outdoor", // 环网柜户外
  rmUnitCtParameters: "RING_MAIN_UNIT_TRANS_PARAM", // 环网柜互感器参数
  rmUnitCommunication: "dic_electric_communication", // 环网柜通讯
  rmUnitProtectionrelay: "", // 环网柜继保
  rmUnitLowPressureAlarm: "dic_electric_low_pressure", // 环网柜低气压报警信号
  rmUnitOverallInterlock: "RING_MAIN_UNIT_LOCK", // 环网柜整机互锁
  rmUnitUpDownInterlock: "dic_electric_unit", // 环网柜上下游互锁
  rmUnitArcExtinguishing: "RING_MAIN_UNIT_ARC", // 环网柜燃弧
  rmUnitElectricalOperation: "dic_electric_cabinet", // 环网柜电操
  rmUnitShortTimeWithstand: "", // 环网柜短耐
  rmUnitFrequencyHz: "", // 环网柜频率 Hz
  rmUnitCabinetType: "RING_MAIN_UNIT_TYPE", // 环网柜柜型
  rmUnitVoltageKv: "", // 环网柜电压 kV
  rmUnitBrand: "RING_MAIN_UNIT_BRAND", // 环网柜品牌
  ringMainUnitMaterialNumber: "", // 环网柜料号
  transformerMediumVoltageCable: "", // 变压器中压电缆
  transformerOtherNonStandard: "", // 变压器其他非标
  transformerHighVoltageInput: "", // 变压器高压进线
  transformerInsulationLevel: "", // 变压器绝缘水平
  transformerFourPosition: "", // 变压器四工位
  transformerCoreShieldGround: "", // 变压器铁芯&屏蔽层接地
  transformerFragmentedFixed: "", // 变压器片散固定
  transformerSpecialHeatRise: "", // 变压器特殊温升
  transformerBushingTube: "", // 变压器引流管
  transformerLoadSwitchOperate: "", // 变压器负荷开关+电操
  transformerConnectionGroup: "", // 变压器联结组别
  transformerBrazilStandard: "", // 变压器巴西标
  transformerOilGasCollector: "", // 变压器集气盒
  transformerLockingDevice: "", // 变压器加锁
  transformerHeatUpgradePaper: "", // 变压器热升级纸
  transformerBrandAssign: "dic_tansformer_brand_index", // 变压器品牌指定
  transformer11Overvoltage: "dic_transformer_overvoltage", // 变压器1.1倍过压
  transformerColor: "TRANSFORMER_COLOR", // 变压器颜色
  transformerAnticorrosiveLevel: "TRANSFORMER_ACZOILING_LEVEL", // 变压器防腐等级
  transformerWindingTemperature: "dic_transfomer_winding", // 变压器绕组温度
  transformerOil: "TRANSFORMER_OIL", // 变压器油
  transformerEfficiency: "", // 变压器效率
  transformerFrequencyHz: "", // 变压器频率 Hz
  transformerMaterial: "TRANSFORMER_MATERIAL", // 变压器材质
  transformerVoltageKv: "", // 变压器电压 kV
  transformerCapacityKva: "", // 变压器容量 kVA
  transformerBrand: "TRANSFORMER_BRAND", // 变压器品牌
  transformerMaterialNumber: "", // 变压器料号
  transformerType: "dic_transformer_type", // 变压器类型
  pdCabinetOutdoor: "", // 配电柜户外配电柜
  pdCabinetUpsMonitoring: "", // 配电柜UPS监控
  pdCabinetLightningProtection: "", // 配电柜防雷
  pdCabinetOutlet: "", // 配电柜插座
  pdCabinetMcb: "", // 配电柜微断
  pdCabinetPanoramicMonitoring: "DIS_CABINET_PANO_MONITOR", // 配电柜全景监控
  pdCabinetTerminalBox: "DIS_CABINET_TERMINAL_BOX", // 配电柜终端盒
  pdCabinetSwitch: "DIS_CABINET_SWITCH", // 配电柜交换机
  pdCabinetElectricMeter: "DIS_CABINET_ELE_METER", // 配电柜电表
  pdCabinetAcIsolation: "dict_dis_iso", // 配电柜交流ISO
  pdCabinetUps: "", // 配电柜UPS
  pdCabinetAuxTransformerSpec: "", // 配电柜辅变规格
};


export const formatFormItemConfig = (baseData) => {
  return [
    //field 是要双向绑定所对应上去的字段  type 输入框类型  label 标头名称  value是输入框默认值
  
    {
      field: "projectLocation",
      type: "input",
      label: "项目地",
      placeholder: "请输入项目地",
      active: false,
    },

    {
      field: "fullMachineSerialNumber",
      type: "input",
      label: "整机编号",
      placeholder: "请输入整机编号",
      active: false,
    },
    {
      field: "fullMachineVersion",
      type: "input",
      label: "整机版本",
      placeholder: "请输入整机版本",
      active: false,
    },
    {
      field: "fullMachineTemperature",
      type: "input",
      label: "整机温度",
      placeholder: "请输入整机温度",
      active: false,
    },
    {
      field: "fullMachineAltitude",
      type: "input",
      label: "整机海拔",
      placeholder: "请输入整机海拔",
      active: false,
    },
    {
      field: "fullMachineProtectionRating",
      type: "input",
      label: "整机防护等级",
      placeholder: "请输入整机防护等级",
      active: false,
    },

    {
      field: "fullMachineTempControlHeat",
      type: "input",
      label: "整机温度控制加热",
      placeholder: "请输入整机温度控制加热",
      active: false,
    },
    {
      field: "fullMachineTestTerminals",
      type: "input",
      label: "整机测试端子",
      placeholder: "请输入整机测试端子",
      active: false,
    },
    {
      field: "fullMachineLoTo",
      type: "input",
      label: "整机LOTO",
      placeholder: "请输入整机LOTO",
      active: false,
    },
    {
      field: "fullMachineOilReservoir",
      type: "input",
      label: "整机油槽",
      placeholder: "请输入整机油槽",
      active: false,
    },
    {
      field: "fullMachineSunshadeMountHole",
      type: "input",
      label: "整机遮阳棚安装孔",
      placeholder: "请输入整机遮阳棚安装孔",
      active: false,
    },
    {
      field: "fullMachineFirewall",
      type: "input",
      label: "整机防火墙",
      placeholder: "请输入整机防火墙",
      active: false,
    },
    {
      field: "fullMachineIntegratedPlatform",
      type: "input",
      label: "整机一体化平台",
      placeholder: "请输入整机一体化平台",
      active: false,
    },
    {
      field: "fullMachineDifferentProtect",
      type: "input",
      label: "整机差动保护",
      placeholder: "请输入整机差动保护",
      active: false,
    },
    {
      field: "fullMachineOtherNonStandard",
      type: "input",
      label: "整机其他非标",
      placeholder: "请输入整机其他非标",
      active: false,
    },
    {
      field: "inverterMaterialNumber",
      type: "input",
      label: "逆变器料号",
      placeholder: "请输入逆变器料号",
      active: false,
    },
    {
      field: "inverterSelfDischargeVoltage",
      type: "input",
      label: "逆变器自流电压",
      placeholder: "请输入逆变器自流电压",
      active: false,
    },
    {
      field: "inverterDcInputChannels",
      type: "input",
      label: "逆变器直流输入路数",
      placeholder: "请输入逆变器直流输入路数",
      active: false,
    },
    {
      field: "inverterMpptChannels",
      type: "input",
      label: "逆变器MPPT路数",
      placeholder: "请输入逆变器MPPT路数",
      active: false,
    },
    {
      field: "inverterFuseSpecification",
      type: "input",
      label: "逆变器熔丝规格",
      placeholder: "请输入逆变器熔丝规格",
      active: false,
    },
    {
      field: "inverterDcBreakerLoadSwitch",
      type: "input",
      label: "逆变器直流断路器负荷开关",
      placeholder: "请输入逆变器直流断路器负荷开关",
      active: false,
    },
    {
      field: "inverterPidControl",
      type: "input",
      label: "逆变器PID",
      placeholder: "请输入逆变器PID",
      active: false,
    },
    {
      field: "inverterAcVoltage",
      type: "input",
      label: "逆变器交流电压",
      placeholder: "请输入逆变器交流电压",
      active: false,
    },
    {
      field: "inverterAcSwitch",
      type: "input",
      label: "逆变器交流开关",
      placeholder: "请输入逆变器交流开关",
      active: false,
    },
    {
      field: "inverterChannels",
      type: "input",
      label: "逆变器路数",
      placeholder: "请输入逆变器路数",
      active: false,
    },
    {
      field: "inverterPvvSg",
      type: "input",
      label: "逆变器PVV SG",
      placeholder: "请输入逆变器PVV SG",
      active: false,
    },
    {
      field: "inverterBlackStart",
      type: "input",
      label: "逆变器黑启动",
      placeholder: "请输入逆变器黑启动",
      active: false,
    },
    {
      field: "pdCabinetMaterialNumber",
      type: "input",
      label: "配电柜料号",
      placeholder: "请输入配电柜料号",
      active: false,
    },
    {
      field: "rmUnitInsulatingCap",
      type: "input",
      label: "环网柜绝缘帽",
      placeholder: "请输入环网柜绝缘帽",
      active: false,
    },
    {
      field: "rmUnitLightningArrester",
      type: "input",
      label: "环网柜避雷器",
      placeholder: "请输入环网柜避雷器",
      active: false,
    },
    {
      field: "rmUnitOtherNonStandard",
      type: "input",
      label: "环网柜其他非标",
      placeholder: "请输入环网柜其他非标",
      active: false,
    },
    {
      field: "rmUnitGroundFaultIndicator",
      type: "input",
      label: "环网柜接地故障指示器",
      placeholder: "请输入环网柜接地故障指示器",
      active: false,
    },
    {
      field: "rmUnitTemperatureControl",
      type: "input",
      label: "环网柜温度控制",
      placeholder: "请输入环网柜温度控制",
      active: false,
    },
    {
      field: "rmUnitRemoteSwitching",
      type: "input",
      label: "环网柜远程分合闸",
      placeholder: "请输入环网柜远程分合闸",
      active: false,
    },
    {
      field: "rmUnitUndervoltageTrip",
      type: "input",
      label: "环网柜欠压脱扣",
      placeholder: "请输入环网柜欠压脱扣",
      active: false,
    },
    {
      field: "rmUnitBrandAssign",
      type: "input",
      label: "环网柜品牌指定",
      placeholder: "请输入环网柜品牌指定",
      active: false,
    },
    {
      field: "rmUnitProtectionrelay",
      type: "input",
      label: "环网柜继保",
      placeholder: "请输入环网柜继保",
      active: false,
    },
    {
      field: "rmUnitShortTimeWithstand",
      type: "input",
      label: "环网柜短耐",
      placeholder: "请输入环网柜短耐",
      active: false,
    },
    {
      field: "rmUnitFrequencyHz",
      type: "input",
      label: "环网柜频率 Hz",
      placeholder: "请输入环网柜频率 Hz",
      active: false,
    },
    {
      field: "rmUnitVoltageKv",
      type: "input",
      label: "环网柜电压 kV",
      placeholder: "请输入环网柜电压 kV",
      active: false,
    },
    {
      field: "ringMainUnitMaterialNumber",
      type: "input",
      label: "环网柜料号",
      placeholder: "请输入环网柜料号",
      active: false,
    },
    {
      field: "transformerMediumVoltageCable",
      type: "input",
      label: "变压器中压电缆",
      placeholder: "请输入变压器中压电缆",
      active: false,
    },
    {
      field: "transformerOtherNonStandard",
      type: "input",
      label: "变压器其他非标",
      placeholder: "请输入变压器其他非标",
      active: false,
    },
    {
      field: "transformerHighVoltageInput",
      type: "input",
      label: "变压器高压进线",
      placeholder: "请输入变压器高压进线",
      active: false,
    },
    {
      field: "transformerInsulationLevel",
      type: "input",
      label: "变压器绝缘水平",
      placeholder: "请输入变压器绝缘水平",
      active: false,
    },
    {
      field: "transformerFourPosition",
      type: "input",
      label: "变压器四工位",
      placeholder: "请输入变压器四工位",
      active: false,
    },
    {
      field: "transformerCoreShieldGround",
      type: "input",
      label: "变压器铁芯&屏蔽层接地",
      placeholder: "请输入变压器铁芯&屏蔽层接地",
      active: false,
    },
    {
      field: "transformerFragmentedFixed",
      type: "input",
      label: "变压器片散固定",
      placeholder: "请输入变压器片散固定",
      active: false,
    },
    {
      field: "transformerSpecialHeatRise",
      type: "input",
      label: "变压器特殊温升",
      placeholder: "请输入变压器特殊温升",
      active: false,
    },
    {
      field: "transformerBushingTube",
      type: "input",
      label: "变压器引流管",
      placeholder: "请输入变压器引流管",
      active: false,
    },
    {
      field: "transformerLoadSwitchOperate",
      type: "input",
      label: "变压器负荷开关+电操",
      placeholder: "请输入变压器负荷开关+电操",
      active: false,
    },
    {
      field: "transformerConnectionGroup",
      type: "input",
      label: "变压器联结组别",
      placeholder: "请输入变压器联结组别",
      active: false,
    },
    {
      field: "transformerBrazilStandard",
      type: "input",
      label: "变压器巴西标",
      placeholder: "请输入变压器巴西标",
      active: false,
    },
    {
      field: "transformerOilGasCollector",
      type: "input",
      label: "变压器集气盒",
      placeholder: "请输入变压器集气盒",
      active: false,
    },
    {
      field: "transformerLockingDevice",
      type: "input",
      label: "变压器加锁",
      placeholder: "请输入变压器加锁",
      active: false,
    },
    {
      field: "transformerHeatUpgradePaper",
      type: "input",
      label: "变压器热升级纸",
      placeholder: "请输入变压器热升级纸",
      active: false,
    },
    {
      field: "transformerEfficiency",
      type: "input",
      label: "变压器效率",
      placeholder: "请输入变压器效率",
      active: false,
    },
    {
      field: "transformerFrequencyHz",
      type: "input",
      label: "变压器频率",
      placeholder: "请输入变压器频率",
      active: false,
    },
    {
      field: "transformerVoltageKv",
      type: "input",
      label: "变压器电压",
      placeholder: "请输入变压器电压",
      active: false,
    },
    {
      field: "transformerCapacityKva",
      type: "input",
      label: "变压器容量",
      placeholder: "请输入变压器容量",
      active: false,
    },
    {
      field: "transformerMaterialNumber",
      type: "input",
      label: "变压器料号",
      placeholder: "请输入变压器料号",
      active: false,
    },
    {
      field: "pdCabinetOutdoor",
      type: "input",
      label: "配电柜户外配电柜",
      placeholder: "请输入配电柜户外配电柜",
      active: false,
    },
    {
      field: "pdCabinetUpsMonitoring",
      type: "input",
      label: "配电柜UPS监控",
      placeholder: "请输入配电柜UPS监控",
      active: false,
    },
    {
      field: "pdCabinetLightningProtection",
      type: "input",
      label: "配电柜防雷",
      placeholder: "请输入配电柜防雷",
      active: false,
    },
    {
      field: "pdCabinetOutlet",
      type: "input",
      label: "配电柜插座",
      placeholder: "请输入配电柜插座",
      active: false,
    },
    {
      field: "pdCabinetMcb",
      type: "input",
      label: "配电柜微断",
      placeholder: "请输入配电柜微断",
      active: false,
    },
    {
      field: "pdCabinetUps",
      type: "input",
      label: "配电柜UPS",
      placeholder: "请输入配电柜UPS",
      active: false,
    },
    {
      field: "pdCabinetAuxTransformerSpec",
      type: "input",
      label: "配电柜辅变规格",
      placeholder: "请输入配电柜辅变规格",
      active: false,
    },
    // 基本数据
    {
      field: "singleUnitCapacityMw",
      type: "select",
      label: "单机容量(MW)",
      placeholder: "请选择单机容量",
      active: false,
      options: filterBaseData(BASE_TYPE.singleUnitCapacityMw, baseData),
    },
    {
      field: "fullMachineAnticorrosiveLevel",
      type: "select",
      label: "整机防腐等级",
      placeholder: "请选择整机防腐等级",
      active: false,
      options: filterBaseData(
        BASE_TYPE.fullMachineAnticorrosiveLevel,
        baseData
      ),
    },
    {
      field: "fullMachineColor",
      type: "select",
      label: "整机颜色",
      placeholder: "请选择整机颜色",
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineColor, baseData),
    },
    {
      field: "fullMachineLanguage",
      type: "select",
      label: "整机小语言",
      placeholder: "请选择整机小语言",
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineLanguage, baseData),
    },
    {
      field: "fullMachineInterlocking",
      type: "select",
      label: "整机互锁",
      placeholder: "请选择整机互锁",
      active: false,
      options: filterBaseData(BASE_TYPE.fullMachineInterlocking, baseData),
    },
    {
      field: "inverterNegativeGroundFloat",
      type: "select",
      label: "逆变器负极接地或浮地",
      placeholder: "请选择逆变器负极接地或浮地",
      active: false,
      options: filterBaseData(BASE_TYPE.inverterNegativeGroundFloat, baseData),
    },
    {
      field: "inverterDcLightningProtection",
      type: "select",
      label: "逆变器直流防雷",
      placeholder: "请选择逆变器直流防雷",
      active: false,
      options: filterBaseData(
        BASE_TYPE.inverterDcLightningProtection,
        baseData
      ),
    },
    {
      field: "inverterAcLightningProtection",
      type: "select",
      label: "逆变器交流防雷",
      placeholder: "请选择逆变器交流防雷",
      active: false,
      options: filterBaseData(
        BASE_TYPE.inverterAcLightningProtection,
        baseData
      ),
    },
    {
      field: "rmUnitCtParameters",
      type: "select",
      label: "环网柜互感器参数",
      placeholder: "请选择环网柜互感器参数",
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitCtParameters, baseData),
    },
    {
      field: "rmUnitOverallInterlock",
      type: "select",
      label: "环网柜整机互锁",
      placeholder: "请选择环网柜整机互锁",
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitOverallInterlock, baseData),
    },
    {
      field: "rmUnitArcExtinguishing",
      type: "select",
      label: "环网柜燃弧",
      placeholder: "请选择环网柜燃弧",
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitArcExtinguishing, baseData),
    },
    {
      field: "rmUnitCabinetType",
      type: "select",
      label: "环网柜柜型",
      placeholder: "请选择环网柜柜型",
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitCabinetType, baseData),
    },
    {
      field: "rmUnitBrand",
      type: "select",
      label: "环网柜品牌",
      placeholder: "请选择环网柜品牌",
      active: false,
      options: filterBaseData(BASE_TYPE.rmUnitBrand, baseData),
    },
    {
      field: "transformerColor",
      type: "select",
      label: "变压器颜色",
      placeholder: "请选择变压器颜色",
      active: false,
      options: filterBaseData(BASE_TYPE.transformerColor, baseData),
    },
    {
      field: "transformerAnticorrosiveLevel",
      type: "select",
      label: "变压器防腐等级",
      placeholder: "请选择变压器防腐等级",
      active: false,
      options: filterBaseData(
        BASE_TYPE.transformerAnticorrosiveLevel,
        baseData
      ),
    },
    {
      field: "transformerOil",
      type: "select",
      label: "变压器油",
      placeholder: "请选择变压器油",
      active: false,
      options: filterBaseData(BASE_TYPE.transformerOil, baseData),
    },
    {
      field: "transformerMaterial",
      type: "select",
      label: "变压器材质",
      placeholder: "请选择变压器材质",
      active: false,
      options: filterBaseData(BASE_TYPE.transformerMaterial, baseData),
    },
    {
      field: "transformerBrand",
      type: "select",
      label: "变压器品牌",
      placeholder: "请选择变压器品牌",
      active: false,
      options: filterBaseData(BASE_TYPE.transformerBrand, baseData),
    },
    {
      field: "pdCabinetPanoramicMonitoring",
      type: "select",
      label: "配电柜全景监控",
      placeholder: "请选择配电柜全景监控",
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetPanoramicMonitoring, baseData),
    },
    {
      field: "pdCabinetTerminalBox",
      type: "select",
      label: "配电柜终端盒",
      placeholder: "请选择配电柜终端盒",
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetTerminalBox, baseData),
    },
    {
      field: "pdCabinetSwitch",
      type: "select",
      label: "配电柜交换机",
      placeholder: "请选择配电柜交换机",
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetSwitch, baseData),
    },
    {
      field: "pdCabinetElectricMeter",
      type: "select",
      label: "配电柜电表",
      placeholder: "请选择配电柜电表",
      active: false,
      options: filterBaseData(BASE_TYPE.pdCabinetElectricMeter, baseData),
    },
  ];
};

export const formatFormItemConfigDcit = (baseData) => {
  return [
    // // 字典
    {
      field: "fullMachineEmergencyStop",
      type: "select",
      label: "整机急停",
      placeholder: "请选择整机急停",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.fullMachineEmergencyStop, baseData),
    },
    {
      field: "inverterDcCableClamp",
      type: "select",
      label: "逆变器直流线缆固定夹",
      placeholder: "请选择逆变器直流线缆固定夹",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterDcCableClamp, baseData),
    },
    {
      field: "inverterDcPlc",
      type: "select",
      label: "逆变器直流PLC",
      placeholder: "请选择逆变器直流PLC",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterDcPlc, baseData),
    },
    {
      field: "inverterOffGridTuning",
      type: "select",
      label: "逆变器离网调试",
      placeholder: "请选择逆变器离网调试",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterOffGridTuning, baseData),
    },
    {
      field: "inverterStorageInterface",
      type: "select",
      label: "逆变器储能接口",
      placeholder: "请选择逆变器储能接口",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterStorageInterface, baseData),
    },
    {
      field: "inverterLowVoltagePowerPort",
      type: "select",
      label: "逆变器低压取电接口",
      placeholder: "请选择逆变器低压取电接口",
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.inverterLowVoltagePowerPort,
        baseData
      ),
    },
    {
      field: "inverterAcOutputLine",
      type: "select",
      label: "逆变器交流出线",
      placeholder: "请选择逆变器交流出线",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterAcOutputLine, baseData),
    },
    {
      field: "inverterNightSvg",
      type: "select",
      label: "逆变器夜间SVG",
      placeholder: "请选择逆变器夜间SVG",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterNightSvg, baseData),
    },
    {
      field: "inverterHeater",
      type: "select",
      label: "逆变器加热器",
      placeholder: "请选择逆变器加热器",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.inverterHeater, baseData),
    },
    {
      field: "rmUnitFaultSignalUpload",
      type: "select",
      label: "环网柜继保故障信号上传",
      placeholder: "请选择环网柜继保故障信号上传",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitFaultSignalUpload, baseData),
    },
    {
      field: "rmUnitOutdoor",
      type: "select",
      label: "环网柜户外",
      placeholder: "请选择环网柜户外",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitOutdoor, baseData),
    },
    {
      field: "rmUnitCommunication",
      type: "select",
      label: "环网柜通讯",
      placeholder: "请选择环网柜通讯",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitCommunication, baseData),
    },
    {
      field: "rmUnitLowPressureAlarm",
      type: "select",
      label: "环网柜低气压报警信号",
      placeholder: "请选择环网柜低气压报警信号",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitLowPressureAlarm, baseData),
    },
    {
      field: "rmUnitUpDownInterlock",
      type: "select",
      label: "环网柜上下游互锁",
      placeholder: "请选择环网柜上下游互锁",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.rmUnitUpDownInterlock, baseData),
    },
    {
      field: "rmUnitElectricalOperation",
      type: "select",
      label: "环网柜电操",
      placeholder: "请选择环网柜电操",
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.rmUnitElectricalOperation,
        baseData
      ),
    },
    {
      field: "transformerBrandAssign",
      type: "select",
      label: "变压器品牌指定",
      placeholder: "请选择变压器品牌指定",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformerBrandAssign, baseData),
    },
    {
      field: "transformer11Overvoltage",
      type: "select",
      label: "变压器1.1倍过压",
      placeholder: "请选择变压器1.1倍过压",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformer11Overvoltage, baseData),
    },
    {
      field: "transformerWindingTemperature",
      type: "select",
      label: "变压器绕组温度",
      placeholder: "请选择变压器绕组温度",
      active: false,
      options: filterBaseDataDict(
        BASE_TYPE.transformerWindingTemperature,
        baseData
      ),
    },
    {
      field: "transformerType",
      type: "select",
      label: "变压器类型",
      placeholder: "请选择变压器类型",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.transformerType, baseData),
    },
    {
      field: "pdCabinetAcIsolation",
      type: "select",
      label: "配电柜交流ISO",
      placeholder: "请选择配电柜交流ISO",
      active: false,
      options: filterBaseDataDict(BASE_TYPE.pdCabinetAcIsolation, baseData),
    },
  ];
};

export const formatFormItemConfigArea = (baseData) =>{
  return [
    {
      field: "area",
      type: "select",
      label: "区域",
      placeholder: "请选择区域",
      active: false,
      options: filterBaseArea(baseData),
    },
  ]
}
// 筛选基本数据
const filterBaseData = (type, baseData) => {
  return baseData[type];
};

// 筛选字段数据
const filterBaseDataDict = (type, baseDataDict) => {
  // 首先获取dictionaryValues
  const it = baseDataDict.find((item) => item.dictionaryCode == type);

  // 然后映射转换每一个对象
  const formattedValues = it.dictionaryValues.map((item) => ({
    title: item.valueName,
    value: item.valueCode,
  }));

  return formattedValues;
};


// 筛选区域
const filterBaseArea = (baseDataArea)=>{
 const areaArr =  baseDataArea.map(item=>({
    title: item.area,
    value: item.area,
  }))

  return areaArr
}