// 數據管理器 - 用於預加載所有JSON文件
import { message } from 'antd';

// 數據接口定義
export interface EntryData {
  entry_id: string;
  entry_name: string;
  entry_type?: string | null;
  explanation: string | null;
  superposability?: string | null;
  talisman?: string;
  notes?: string | null;
}

export interface EnhancementCategory {
  category: string;
  applicable_scope: {
    [key: string]: string[];
  };
  notes: string[];
}

export interface WeaponCharacter {
  [weaponName: string]: {
    [characterName: string]: number;
  };
}

export interface WeaponEffect {
  [weaponName: string]: {
    類型: string;
    特效: string;
    描述: string;
    削韌: string;
  };
}

export interface CharacterState {
  [key: string]: string;
}

export interface CharacterData {
  [characterName: string]: CharacterState;
}

export interface MagicMove {
  屬性痕: string;
  屬性圖標: string;
  混合魔法: string;
  總傷害: string;
  持續時間: string;
  混合魔法效果: string;
}

export interface InvincibleFrame {
  name: string;
  type: string;
  value: number;
}

// 道具效果數據接口
export interface ItemEffect {
  name: string;
  effect: string;
  singleGridQty: string;
  type: string;
}

// 角色詳細數據接口
export interface CharacterDetailData {
  [characterName: string]: Array<{
    等級: number;
    HP: number;
    FP: number;
    ST: number;
    [key: string]: any;
  }>;
}

// 全局數據存儲
class DataManager {
  private static instance: DataManager;
  private dataCache: Map<string, any> = new Map();
  private loadingPromise: Promise<void> | null = null;
  private isLoaded = false;

  private constructor() {}

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  // 預加載所有數據
  public async preloadAllData(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.loadData();
    return this.loadingPromise;
  }

  private async loadData(): Promise<void> {
    try {
      // 角色詳細數據文件列表（英文文件名）
      const characterDetailFiles = [
        'tracker.json',
        'duchess.json',
        'hermit.json',
        'iron-eye.json',
        'rogue.json',
        'executor.json', 
        'guardian.json',
        'avenger.json',
      ];

      // 文件名到中文名稱的映射
      const fileNameToChineseName: { [key: string]: string } = {
        'tracker.json': '追蹤者',
        'duchess.json': '女爵',
        'hermit.json': '隱士',
        'iron-eye.json': '鐵之眼',
        'rogue.json': '無賴',
        'executor.json': '執行者',
        'guardian.json': '守護者',
        'avenger.json': '復仇者',
      };

      const [
        outsiderEntries,
        talismanEntries,
        inGameEntries,
        weaponCharacter,
        weaponEffect,
        characterStates,
        magicMoveList,
        invincibleFrames,
        enhancementCategories,
        inGameSpecialBuff,
        characterData,
        itemEffects,
        deepNightEntries,
        inGameDeepNightEntries
      ] = await Promise.all([
        import('../data/i18n/zh-TW/outsider_entries_zh-TW.json'),
        import('../data/i18n/zh-TW/talisman_entries_zh-TW.json'),
        import('../data/i18n/zh-TW/in-game_entries_zh-TW.json'),
        import('../data/i18n/zh-TW/weapon_character.json'),
        import('../data/i18n/zh-TW/weapon_effect.json'),
        import('../data/i18n/zh-TW/character_states.json'),
        import('../data/i18n/zh-TW/magic_move_list.json'),
        import('../data/i18n/zh-TW/invincible_frames.json'),
        import('../data/i18n/zh-TW/enhancement_categories.json'),
        import('../data/i18n/zh-TW/in-game_special_buff.json'),
        import('../data/i18n/zh-TW/character-info/character_data.json'),
        import('../data/i18n/zh-TW/item_effect.json'),
        import('../data/i18n/zh-TW/deep_night_entries.json'),
        import('../data/i18n/zh-TW/in-game_deep_night_entries.json')
      ]);

      // 加載角色詳細數據
      const characterDetailData: { [key: string]: any } = {};
      for (const fileName of characterDetailFiles) {
        try {
          // 使用具體的文件路徑來避免動態導入警告
          const chineseName = fileNameToChineseName[fileName];
          let characterModule;
          
          switch (fileName) {
            case 'tracker.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/tracker.json');
              break;
            case 'duchess.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/duchess.json');
              break;
            case 'hermit.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/hermit.json');
              break;
            case 'iron-eye.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/iron-eye.json');
              break;
            case 'rogue.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/rogue.json');
              break;
            case 'executor.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/executor.json');
              break;
            case 'guardian.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/guardian.json');
              break;
            case 'avenger.json':
              characterModule = await import('../data/i18n/zh-TW/character-info/avenger.json');
              break;
            default:
              console.warn(`未知的角色文件: ${fileName}`);
              continue;
          }
          
          characterDetailData[chineseName] = (characterModule.default as any)[chineseName];
        } catch (error) {
          console.warn(`無法加載角色詳細數據文件 ${fileName}:`, error);
        }
      }

      // 存儲數據到緩存
      this.dataCache.set('outsiderEntries', outsiderEntries.default);
      this.dataCache.set('talismanEntries', talismanEntries.default);
      this.dataCache.set('inGameEntries', inGameEntries.default);
      this.dataCache.set('weaponCharacter', weaponCharacter.default);
      this.dataCache.set('weaponEffect', weaponEffect.default);
      this.dataCache.set('characterStates', characterStates.default);
      this.dataCache.set('magicMoveList', magicMoveList.default);
      this.dataCache.set('invincibleFrames', invincibleFrames.default);
      this.dataCache.set('enhancementCategories', enhancementCategories.default);
      this.dataCache.set('inGameSpecialBuff', inGameSpecialBuff.default);
      this.dataCache.set('characterData', characterData.default);
      this.dataCache.set('characterDetailData', characterDetailData);
      this.dataCache.set('itemEffects', itemEffects.default);
      this.dataCache.set('deepNightEntries', deepNightEntries.default);
      this.dataCache.set('inGameDeepNightEntries', inGameDeepNightEntries.default);

      this.isLoaded = true;
      console.log('所有數據預加載完成');
    } catch (error) {
      console.error('數據預加載失敗:', error);
      message.error('數據加載失敗，請刷新頁面重試');
      throw error;
    }
  }

  // 獲取數據的方法
  public getOutsiderEntries(): EntryData[] {
    return this.dataCache.get('outsiderEntries') || [];
  }

  public getTalismanEntries(): EntryData[] {
    return this.dataCache.get('talismanEntries') || [];
  }

  public getInGameEntries(): EntryData[] {
    return this.dataCache.get('inGameEntries') || [];
  }

  public getWeaponCharacter(): WeaponCharacter[] {
    return this.dataCache.get('weaponCharacter') || [];
  }

  public getWeaponEffect(): WeaponEffect[] {
    return this.dataCache.get('weaponEffect') || [];
  }

  public getCharacterStates(): CharacterData[] {
    return this.dataCache.get('characterStates') || [];
  }

  public getMagicMoveList(): MagicMove[] {
    return this.dataCache.get('magicMoveList') || [];
  }

  public getInvincibleFrames(): InvincibleFrame[] {
    return this.dataCache.get('invincibleFrames') || [];
  }

  public getEnhancementCategories(): EnhancementCategory[] {
    return this.dataCache.get('enhancementCategories') || [];
  }

  public getInGameSpecialBuff(): any[] {
    return this.dataCache.get('inGameSpecialBuff') || [];
  }

  public getCharacterData(): any {
    return this.dataCache.get('characterData') || {};
  }

  public getCharacterDetailData(): { [key: string]: any } {
    return this.dataCache.get('characterDetailData') || {};
  }

  public getItemEffects(): ItemEffect[] {
    return this.dataCache.get('itemEffects') || [];
  }

  public getDeepNightEntries(): EntryData[] {
    const rawData = this.dataCache.get('deepNightEntries') || [];
    // 處理深夜模式局外詞條的數據格式
    const processedData: EntryData[] = [];
    
    if (Array.isArray(rawData)) {
      rawData.forEach(group => {
        if (typeof group === 'object' && group !== null) {
          Object.values(group).forEach((entry: any) => {
            if (entry && typeof entry === 'object') {
              processedData.push({
                entry_id: entry.entry_id || entry.entry_entry_id || '',
                entry_name: entry.entry_name || '',
                entry_type: entry.entry_type || null,
                explanation: entry.explanation || null,
                superposability: entry.superposability || null,
                notes: entry.notes || null
              });
            }
          });
        }
      });
    }
    
    return processedData;
  }

  public getInGameDeepNightEntries(): EntryData[] {
    const rawData = this.dataCache.get('inGameDeepNightEntries') || [];
    // 處理深夜模式局內詞條的數據格式
    const processedData: EntryData[] = [];
    
    if (Array.isArray(rawData)) {
      rawData.forEach(group => {
        if (typeof group === 'object' && group !== null) {
          Object.values(group).forEach((entry: any) => {
            if (entry && typeof entry === 'object') {
              processedData.push({
                entry_id: entry.entry_id || entry.entry_entry_id || '',
                entry_name: entry.entry_name || '',
                entry_type: entry.entry_type || null,
                explanation: entry.explanation || null,
                superposability: entry.superposability || null,
                notes: entry.notes || null
              });
            }
          });
        }
      });
    }
    
    return processedData;
  }

  // 檢查是否已加載
  public isDataLoaded(): boolean {
    return this.isLoaded;
  }

  // 等待數據加載完成
  public async waitForData(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }
    return this.loadingPromise || this.preloadAllData();
  }
}

export default DataManager; 