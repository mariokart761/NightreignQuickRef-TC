import React from 'react';
import { useVercount } from 'vercount-react';
import { Typography, Space, Button, Tooltip, Popover } from 'antd';
import { MoonOutlined, SunOutlined, FireOutlined, ReadOutlined, BaiduOutlined, BilibiliOutlined, LinkOutlined, ArrowRightOutlined, GithubOutlined, PushpinOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  // onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({
  isDarkMode,
  onToggleTheme,
  // onToggleLanguage
}) => {
  const { sitePv, siteUv, pagePv } = useVercount();

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-right">
            <Space size="small">
              <Tooltip title={isDarkMode ? "切換到亮色模式" : "切換到暗色模式"} placement="bottom">
                <Button
                  type="text"
                  icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
                  onClick={onToggleTheme}
                  className="theme-toggle-btn"
                />
              </Tooltip>

              <Tooltip title={"點擊跳轉【地圖種子篩選器】"} placement="bottom">
                <Button
                  type="text"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z" />
                  </svg>}
                  onClick={() => window.open('https://xxiixi.github.io/NightreignMapFilter/', '_blank')}
                  className="theme-toggle-btn"
                />
              </Tooltip>

              <Tooltip title="查看訪問量" placement="bottom" className="theme-toggle-btn">
                <Popover
                  content={
                    <div style={{ padding: '5px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid rgba(198, 198, 198, 0.2)', paddingBottom: '4px' }}>
                        訪問量統計 🔥
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        本站總訪客數 <span style={{ color: '#1890ff' }}>{siteUv}</span> 人
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        本站總訪問量 <span style={{ color: '#1890ff' }}>{sitePv}</span> 次
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        數據查詢頁訪問量 <span style={{ color: '#1890ff' }}>{pagePv}</span> 次
                      </div>
                      <div style={{
                        marginTop: '8px',
                        borderTop: '1px solid rgba(198, 198, 198, 0.2)',
                        paddingTop: '8px',
                        fontSize: '10px',
                        color: '#999'
                      }}>
                        統計服務: Vercount
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <Button
                    type="text"
                    icon={<FireOutlined />}
                    className="visits-counter-btn"
                  />
                </Popover>
              </Tooltip>

              <Tooltip title="查看數據來源" placement="bottom" className="theme-toggle-btn">
                <Popover
                  content={
                    <div style={{ padding: '8px', maxWidth: '250px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid rgba(198, 198, 198, 0.2)', paddingBottom: '8px' }}>
                        數據來源鏈接 🔗
                      </div>
                      {/* Baidu  */}
                      <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <BaiduOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨 v1.01數據彙總
                          <a
                            href="https://tieba.baidu.com/p/9906444262?pid=152430482433&cid=#152430482433"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BaiduOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨 新詞條數據一覽
                          <a
                            href="https://tieba.baidu.com/p/9935090782?pid=152476350171&cid=#152476350171"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BaiduOutlined style={{ marginRight: '4px' }} />
                          全傳說武器庇佑效果
                          <a
                            href="https://tieba.baidu.com/p/9889921465?pid=152403477340&cid=#152403477340"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BaiduOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨1.02.2部分詳細更新內容（包含深夜模式改動）
                          <a
                            href="https://tieba.baidu.com/p/10026641416?pid=152611338073&cid=#152611338073"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BaiduOutlined style={{ marginRight: '4px' }} />
                          劍骸馬雷1.02.2具體成長曲線
                          <a
                            href="https://tieba.baidu.com/p/10027082782?share=9105&fr=sharewise&see_lz=0"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>

                        <div style={{ marginBottom: '0px', borderTop: '1px solid rgba(198, 198, 198, 0.2)', paddingTop: '8px' }} />

                        {/* Bilibili  */}
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          【艾爾登法環：黑夜君臨】全詞條彙總！遺物+護符+武器固有效果+武器隨機buff
                          <a
                            href="https://www.bilibili.com/video/BV1GfMSzvE3V"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          【艾爾登法環：黑夜君臨】全角色迴避翻滾動作，無敵幀分析對比！
                          <a
                            href="https://www.bilibili.com/video/BV1LvuVzuEqo"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          【黑夜君臨】聖盃瓶恢復、緩回、群回機制解析及常見誤區
                          <a
                            href="https://www.bilibili.com/video/BV1M18jzQE9X"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨 永夜山羊罪人NPC預設一覽+部分buff/debuff數值
                          <a
                            href="https://www.bilibili.com/video/BV1wzvNzREYQ/?spm_id_from=333.1387.upload.video_card.click&vd_source=37640654dbdd4ab80b471a16ac6da3c0"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          【黑夜君臨】局內減傷詞條疊加測試
                          <a
                            href="https://www.bilibili.com/opus/1100871642065666054"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨：渡夜者各等級屬性點數一覽
                          <a
                            href="https://www.bilibili.com/video/BV1p5ThzfEy7"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          黑夜君臨：復活機制解析
                          <a
                            href="https://www.bilibili.com/video/BV1TnNLzXESx"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <BilibiliOutlined style={{ marginRight: '4px' }} />
                          【艾爾登法環：黑夜君臨】深夜模式，全詞條！（遺物+武器+負面詞條機制）
                          <a
                            href="https://www.bilibili.com/video/BV1JLpxzmEdv"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '0px', borderTop: '1px solid rgba(198, 198, 198, 0.2)', paddingTop: '8px' }} />
                        <div style={{ marginBottom: '4px' }}>
                          <LinkOutlined style={{ marginRight: '4px' }} />
                          每日縮圈時間
                          <a
                            href="https://mobalytics.gg/elden-ring-nightreign/guides/day-length"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <LinkOutlined style={{ marginRight: '4px' }} />
                          角色升級所需盧恩
                          <a
                            href="https://game8.co/games/Elden-Ring-Nightreign/archives/522643"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <LinkOutlined style={{ marginRight: '4px' }} />
                          官方 Wiki
                          <a
                            href="https://eldenringnightreign.wiki.fextralife.com/Elden+Ring+Nightreign+Wiki"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowRightOutlined />
                          </a>
                        </div>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <Button
                    type="text"
                    icon={<ReadOutlined />}
                    className="visits-counter-btn"
                  />
                </Popover>
              </Tooltip>
              {/* <Tooltip title="網站聲明" placement="bottom" className="theme-toggle-btn">
                <Popover
                  content={
                    <div style={{ padding: '8px', maxWidth: '250px', width: '250px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid rgba(198, 198, 198, 0.2)', paddingBottom: '8px' }}>
                        網站聲明 📜
                      </div>
                      <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                        <div style={{ marginBottom: '6px' }}>
                          📕 本網站為個人製作，非官方授權網站;
                        </div>
                        <div style={{ marginBottom: '6px' }}>
                          📘 數據由個人收集整理，可能存在錯誤或遺漏，請以數據來源的原數據為準;
                        </div>
                        <div style={{ marginBottom: '6px' }}>
                          📗 點擊左側 <ReadOutlined /> 按鈕可查看具體數據來源鏈接;
                        </div>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <Button
                    type="text"
                    icon={<RobotOutlined />}
                    className="visits-counter-btn"
                  />
                </Popover>
              </Tooltip> */}
              <Tooltip title="查看更新記錄和計劃" placement="bottom" className="theme-toggle-btn">
                <Popover
                  content={
                    <div style={{ padding: '8px', maxWidth: '280px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid rgba(198, 198, 198, 0.2)', paddingBottom: '8px' }}>
                        更新記錄 & 計劃 📋
                      </div>
                      <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                        {/* 最新更新 */}
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ fontWeight: 'bold', color: '#1890ff', marginBottom: '4px' }}>
                            🆕 最新更新 (v1.02.3 | 9月24日)
                          </div>
                          <div style={{ marginLeft: '12px', marginBottom: '2px' }}>
                            • 添加了深夜模式局外詞條、局內詞條
                          </div>
                          <div style={{ marginLeft: '12px', marginBottom: '2px' }}>
                            • 更新了v1.02.3版本的新數據
                          </div>
                        </div>

                        <div style={{ marginBottom: '8px', borderTop: '1px solid rgba(198, 198, 198, 0.2)', paddingTop: '8px' }}>
                          <div style={{ fontWeight: 'bold', color: '#52c41a', marginBottom: '4px' }}>
                            🔧 TODO
                          </div>
                          <div style={{ marginLeft: '12px', marginBottom: '2px' }}>
                            • 夜雨傷害數據待更新(無數據來源)
                          </div>
                        </div>

                        {/* <div style={{ marginBottom: '0px', borderTop: '1px solid rgba(198, 198, 198, 0.2)', paddingTop: '8px' }}>
                          <div style={{ fontWeight: 'bold', color: '#fa8c16', marginBottom: '4px' }}>
                            🐛 已知問題
                          </div>
                          <div style={{ marginLeft: '12px', marginBottom: '2px' }}>
                            • 部分數據可能存在版本差異，發現後會儘快修正
                          </div>
                        </div> */}
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <Button
                    type="text"
                    icon={<PushpinOutlined />}
                    className="visits-counter-btn"
                  />
                </Popover>
              </Tooltip>
              <Tooltip title="查看項目倉庫" placement="bottom" className="theme-toggle-btn">
                <Popover
                  content={
                    <div style={{ padding: '8px', maxWidth: '200px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold' }}>
                        <GithubOutlined style={{ marginRight: '4px' }} /> GitHub倉庫
                      </div>
                      <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                        <a
                          href="https://github.com/xxiixi/NightreignQuickRef"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="header-link"
                        >
                          原作者 NightreignQuickRef
                        </a>
                      </div>
                      <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                        <a
                          href="https://github.com/mariokart761/NightreignQuickRef-TC"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="header-link"
                        >
                          繁體中文版 NightreignQuickRef-TC
                        </a>
                      </div>
                      <div style={{
                        marginTop: '8px',
                        borderTop: '1px solid rgba(198, 198, 198, 0.2)',
                        paddingTop: '8px',
                        fontSize: '10px',
                        color: '#999'
                      }}>
                        🙏 請給予原作者支持 ⭐️ 感謝您 🙏
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <Button
                    type="text"
                    icon={<GithubOutlined />}
                    className="visits-counter-btn"
                  />
                </Popover>
              </Tooltip>
              {/* <Tooltip title="切換語言功能尚未開發" placement="bottom">
                <Button
                  type="text"
                  icon={<TranslationOutlined />}
                  onClick={onToggleLanguage}
                  className="language-toggle-btn"
                />
              </Tooltip> */}
            </Space>
          </div>
        </div>
      </div>

      <div className="header">
        <Title level={1} className="main-title">
          黑夜君臨速查手冊
        </Title>
        <Space direction="vertical" size="small" className="subtitle">
          <Text type="secondary" className="subtitle-text version-info">
            黑夜君臨版本: v1.02.3 (2025.9.24更新)
          </Text>
          <Text type="secondary" className="subtitle-text">
            個人收集/整理的黑夜君臨數據、機制速查網頁，可快速檢索條目信息，後續會添加更多內容
          </Text>
        </Space>
      </div>
    </>
  );
});

export default Header; 