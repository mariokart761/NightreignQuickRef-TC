import React, { useState } from 'react';
import { Tooltip, Menu } from 'antd';
import logoImage from '../assets/logo-circle.png';
import { getMainNavigationOrder } from '../config/navigationConfig';

interface FunctionMenuProps {
  onTabChange: (tab: string) => void;
  onSubTabChange?: (tabKey: string) => void; // 子Tab切換回調
  onStepChange?: (stepIndex: number) => void; // Step切換回調
}

const FunctionMenu: React.FC<FunctionMenuProps> = ({ onTabChange, onSubTabChange, onStepChange }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 功能導航菜單項 - 使用Menu組件的數據結構
  const menuItems = [
    {
      key: '遊戲機制',
      label: '⚙️ 遊戲機制',
      children: [
        { key: '遊戲時間機制', label: '⏰ 遊戲時間機制', anchorId: 'game-time-mechanism' },
        { key: '升級所需盧恩', label: '💰 升級所需盧恩統計', anchorId: 'runes-required' },
        { key: '遊戲時間機制: 監牢/夜雨', label: '🌧️ 遊戲時間機制: 監牢/夜雨', anchorId: 'prison-rain-mechanism' },
        { key: '血量恢復計算器', label: '❤️ 血量恢復計算器', anchorId: 'recovery-calculator' },
        { key: '評論與討論', label: '💬 評論與討論', anchorId: 'comments-discussion' }
      ]
    },
    {
      key: '角色數據',
      label: '👤 角色數據',
      children: [
        { key: '角色屬性數據', label: '📊 角色基礎屬性對比', anchorId: 'character-attributes' },
        { key: '角色詳細數據', label: '📈 角色等級成長數據', anchorId: 'character-detail-data' },
        { key: '無敵幀長度對比', label: '⚡ 翻滾/閃避無敵幀對比', anchorId: 'dodge-frames' },
        { key: '隱士出招表', label: '🔮 隱士混合魔法出招表', anchorId: 'hermit-magic-list' }
      ]
    },
    {
      key: '詞條詳細數據',
      label: '📋 詞條詳細數據',
      children: [
        { key: '局外詞條', label: '🌕 局外詞條', anchorId: 'outsider-entries', tabKey: '局外詞條' },
        { key: '局內詞條', label: '🌖 局內詞條', anchorId: 'in-game-entries', tabKey: '局內詞條' },
        { key: '護符詞條', label: '🌗 護符詞條', anchorId: 'talisman-entries', tabKey: '護符詞條' },
        { key: '強化類別詞條適用範圍', label: '🌘 強化類別詞條適用範圍', anchorId: 'enhancement-categories', tabKey: '強化類別詞條適用範圍' },
        { key: '道具/採集效果', label: '🌒 道具/採集效果', anchorId: 'item-effects', tabKey: '道具效果' },
        { key: '深夜模式-局外詞條', label: '🌌 深夜模式-局外詞條', anchorId: 'deep-night-entries', tabKey: '深夜模式局外詞條' },
        { key: '深夜模式-局內詞條', label: '🌌 深夜模式-局內詞條', anchorId: 'deep-night-in-game-entries', tabKey: '深夜模式局內詞條' },
      ]
    },
    {
      key: '夜王Boss數據',
      label: '👑 夜王Boss數據',
      children: [
        { key: '夜王基礎數據', label: '🌙 夜王基礎數據', anchorId: 'night-king-basic', tabKey: 'boss-data' },
        { key: '野生Boss數據', label: '☠️ 野生Boss數據', anchorId: 'wild-boss-data', tabKey: 'wild-boss-data' },
        { key: '圓桌廳堂人物數據', label: '🏛️ 圓桌廳堂人物數據', anchorId: 'roundtable-characters', tabKey: 'character-data' },
        { key: '永夜山羊召喚罪人詳情', label: '🐐 永夜山羊召喚罪人詳情', anchorId: 'sinner-details', tabKey: 'sinner-data' },
        { key: '利普拉的交易選項', label: '⚖️ 利普拉的交易(Boss戰)', anchorId: 'lipula-trades', tabKey: 'lipula-trades' },
        { key: '特殊事件及地形效果', label: '🌋 特殊事件及地形效果', anchorId: 'special-events', tabKey: 'special-events' }
      ]
    },
    {
      key: '傳說武器詳情',
      label: '⚔️ 傳說武器詳情',
      children: [
        { key: '傳說武器強度面板', label: '🛡️ 不同角色使用傳說武器的強度面板', anchorId: 'weapon-strength-panel', stepIndex: 0 },
        { key: '武器庇佑效果', label: '🗡️ 傳說武器的庇佑效果', anchorId: 'weapon-blessing-effects', stepIndex: 1 }
      ]
    },
  ];



  // 根據配置文件中的順序重新排列菜單項
  const getOrderedMenuItems = () => {
    const order = getMainNavigationOrder();
    return order.map(key => {
      const item = menuItems.find(item => item.key === key);
      return item!;
    });
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    // 檢查是否是主菜單項
    const mainMenuItem = menuItems.find(item => item.key === key);
    if (mainMenuItem) {
      // 切換到對應的功能頁面
      onTabChange(key);
      setMenuVisible(false);
    } else {
      // 檢查是否是子菜單項
      const subMenuItem = menuItems.flatMap(item =>
        item.children.map(subItem => ({ ...subItem, parentKey: item.key }))
      ).find(subItem => subItem.key === key);

      if (subMenuItem) {
        // 先切換到父菜單頁面
        onTabChange(subMenuItem.parentKey);
        setMenuVisible(false);

        // 延遲執行錨點跳轉，確保頁面已經渲染
        setTimeout(() => {
          // 處理Tab頁面的切換
          if ('tabKey' in subMenuItem && subMenuItem.tabKey && onSubTabChange) {
            onSubTabChange(subMenuItem.tabKey);
          }

          // 處理Step頁面的切換
          if ('stepIndex' in subMenuItem && typeof subMenuItem.stepIndex === 'number' && onStepChange) {
            onStepChange(subMenuItem.stepIndex);
          }

          // 執行錨點跳轉
          if (subMenuItem.anchorId) {
            const element = document.getElementById(subMenuItem.anchorId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        }, 200);
      }
    }
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };



  return (
    <div className="fixed-logo">
      <Tooltip title="功能導航" placement="right">
        <img
          src={logoImage}
          alt="Nightreign Logo"
          onClick={() => setMenuVisible(!menuVisible)}
          style={{
            cursor: 'pointer',
            width: 'clamp(30px, 5vw, 50px)',
            height: 'clamp(30px, 5vw, 50px)',
            borderRadius: '50%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
      </Tooltip>

      {/* 功能導航菜單 */}
      {menuVisible && (
        <div
          className="function-menu-overlay"
          style={{
            position: 'fixed',
            top: 'clamp(60px, 8vh, 80px)',
            left: 'clamp(60px, 3vw, 80px)',
            zIndex: 1040,
            backgroundColor: 'var(--content-bg)',
            borderRadius: 'clamp(6px, 1vw, 12px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            minWidth: 'clamp(200px, 25vw, 280px)',
            maxWidth: 'clamp(250px, 30vw, 350px)',
            maxHeight: 'calc(100vh - clamp(120px, 15vh, 180px))',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <Menu
            mode="inline"
            items={getOrderedMenuItems()}
            onClick={handleMenuClick}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{
              border: 'none',
              backgroundColor: 'transparent'
            }}
            className="function-menu"
          />
        </div>
      )}

      {/* 點擊外部關閉菜單 */}
      {menuVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1030
          }}
          onClick={() => setMenuVisible(false)}
        />
      )}


    </div>
  );
};

export default FunctionMenu; 