import React, { useState, useEffect, useRef } from 'react';

// Helper component for animated counters
const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1000; // 1 second
          const increment = target / (duration / 10);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(Math.floor(start));
          }, 10);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target]);

  return <div ref={ref}>{count}</div>;
};

// Helper component for a gradient border effect
const GradientBorderCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}> = ({ children, className, hoverEffect = true }) => {
  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30'
    : '';
  return (
    <div
      className={`p-px rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-fuchsia-500 ${hoverClasses}`}
    >
      <div className={`bg-gray-900 rounded-xl h-full w-full ${className}`}>
        {children}
      </div>
    </div>
  );
};

// Main component
const InfinitumProfileUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleHapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    // This is a placeholder for Telegram Web App Haptic Feedback API
    // In a real Telegram Mini App, you would use:
    // if (window.Telegram && window.Telegram.WebApp) {
    //   if (type === 'success' || type === 'warning' || type === 'error') {
    //     window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
    //   } else {
    //     window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    //   }
    // }
    console.log(`Haptic feedback: ${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pb-20">
      {/* Cosmic Background - Simplified particle effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-950 to-purple-950 opacity-50 animate-gradient-shift" />
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-50 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header with gradient */}
      <div className="relative h-52 bg-gradient-to-br from-purple-500 via-purple-400 to-fuchsia-500 rounded-b-3xl shadow-xl z-10">
        {/* Placeholder for subtle particles animation */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-20 -mt-24 px-4 max-w-3xl mx-auto">
        {/* Avatar with magical ring and progress */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center border-2 border-purple-400 shadow-lg shadow-purple-500/50 animate-pulse-slow">
            {/* Progress Ring (simplified) */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-300 border-r-purple-500 animate-spin-slow" />
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-28 h-28 flex items-center justify-center overflow-hidden">
              {/* Actual Avatar Placeholder */}
              <span className="text-gray-500 text-5xl">👤</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-purple-200 to-fuchsia-300 tracking-tight-0.5">
            Имя Пользователя
          </h1>
          <p className="text-purple-300 text-lg font-semibold mt-1">
            ⭐ Уровень 12 • Мистик
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30">
            <div className="text-purple-400 text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-purple-200 to-fuchsia-300">
              <AnimatedCounter target={127} />
            </div>
            <p className="text-gray-300 text-sm">Контент</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30">
            <div className="text-purple-400 text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-purple-200 to-fuchsia-300">
              <AnimatedCounter target={45} />
            </div>
            <p className="text-gray-300 text-sm">Регалии</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30">
            <div className="text-purple-400 text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-purple-200 to-fuchsia-300">
              <AnimatedCounter target={89} />%
            </div>
            <p className="text-gray-300 text-sm">Прогресс</p>
          </div>
        </div>

        {/* Content Cards */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-4">Рекомендуемый контент</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <GradientBorderCard key={i} className="p-4 flex flex-col gap-3">
              <div className="relative h-40 bg-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed rounded-lg w-full h-full flex items-center justify-center text-gray-500 text-xl">Превью {i}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <span className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-xs px-2 py-1 rounded-full font-medium">🏷️ Астрология</span>
                  <span className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-xs px-2 py-1 rounded-full font-medium">⏱️ 15 мин</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-50">Заголовок контента {i}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">Краткое описание в две строки для предпросмотра, чтобы пользователь мог быстро понять суть.</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-400 to-purple-400 h-2.5 rounded-full"
                    style={{ width: `${90 - i * 5}%` }}
                  />
                </div>
                <span className="text-xs text-gray-300">{90 - i * 5}% релевантность</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>👤 Эксперт</span>
                  <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">🎧</span>
                  <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">📄</span>
                </div>
                <div className="flex gap-3 text-gray-400">
                  <button className="hover:text-purple-400 transition-colors" onClick={() => handleHapticFeedback('light')}>💾</button>
                  <button className="hover:text-purple-400 transition-colors" onClick={() => handleHapticFeedback('light')}>↗️</button>
                  <span className="flex items-center gap-1 text-yellow-300">⭐ 4.8</span>
                </div>
              </div>
            </GradientBorderCard>
          ))}
        </div>

        {/* Achievements Section */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-4">Созвездие достижений</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { name: 'Первооткрыватель', rarity: 'legendary', icon: '🏆', unlocked: true },
            { name: 'Мастер Астрологии', rarity: 'epic', icon: '✨', unlocked: true },
            { name: 'Мудрец', rarity: 'rare', icon: '📚', unlocked: false },
            { name: 'Звездный Путник', rarity: 'common', icon: '💫', unlocked: true },
            { name: 'Космический Герой', rarity: 'legendary', icon: '🌟', unlocked: false },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-xl text-center transition-all duration-300 ease-in-out
                ${achievement.unlocked
                  ? 'bg-white/10 backdrop-blur-md border border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30'
                  : 'bg-gray-800 border border-gray-700 opacity-70 cursor-not-allowed'}
              `}
            >
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-xl">
                  <span className="text-gray-500 text-2xl">🔒</span>
                </div>
              )}
              <div
                className={`text-5xl mb-2 ${achievement.rarity === 'legendary' ? 'text-yellow-300 animate-pulse' : ''}
                ${achievement.rarity === 'epic' ? 'text-purple-400' : ''}
                ${achievement.rarity === 'rare' ? 'text-blue-400' : ''}
                ${achievement.rarity === 'common' ? 'text-gray-400' : ''}
                `}
              >
                {achievement.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-50 mb-1">{achievement.name}</h4>
              <div className="flex justify-center text-yellow-300 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < (achievement.rarity === 'legendary' ? 5 : achievement.rarity === 'epic' ? 4 : achievement.rarity === 'rare' ? 3 : 2) ? 'text-yellow-300' : 'text-gray-600'}>⭐</span>
                ))}
              </div>
              {achievement.unlocked && <p className="text-gray-500 text-xs mt-2">Получено: 15.01.24</p>}
            </div>
          ))}
        </div>

        {/* Astrology Widgets */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-4">Астрологический прогноз</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {/* Today Widget */}
          <GradientBorderCard className="p-4">
            <h3 className="text-xl font-semibold text-gray-50 mb-3">Сегодня</h3>
            <p className="text-purple-300 text-lg mb-2">🌖 Убывающая Луна в ♌ Льве</p>
            <p className="text-gray-400 text-sm mb-4">Фаза: 67% • 18 лунный день</p>
            <div className="mb-2">
              <p className="text-gray-300 font-medium">Благоприятно:</p>
              <p className="text-green-400 text-sm">✅ Творчество ✅ Общение</p>
            </div>
            <div>
              <p className="text-gray-300 font-medium">Не рекомендуется:</p>
              <p className="text-red-400 text-sm">⛔ Важные решения</p>
            </div>
          </GradientBorderCard>

          {/* Calendar Widget (Simplified) */}
          <GradientBorderCard className="p-4">
            <div className="flex justify-between items-center mb-3">
              <button className="text-purple-400 hover:text-purple-300 transition-colors" onClick={() => handleHapticFeedback('light')}>←</button>
              <h3 className="text-xl font-semibold text-gray-50">Январь 2024</h3>
              <button className="text-purple-400 hover:text-purple-300 transition-colors" onClick={() => handleHapticFeedback('light')}>→</button>
            </div>
            <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-2">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <span key={day} className="font-medium">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-gray-200">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isFullMoon = day === 11;
                const isEvent = day === 19;
                return (
                  <div
                    key={day}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-purple-800 transition-colors relative
                      ${isFullMoon ? 'text-yellow-300 font-bold' : ''}
                      ${isEvent ? 'text-purple-400 font-bold' : ''}
                    `}
                    onClick={() => handleHapticFeedback('light')}
                  >
                    {day}
                    {isFullMoon && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs">🌕</span>}
                    {isEvent && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs">⚡</span>}
                  </div>
                );
              })}
            </div>
          </GradientBorderCard>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around items-center h-16 z-50 max-w-3xl mx-auto rounded-t-2xl shadow-2xl shadow-black/50">
        {[
          { id: 'home', icon: '🏠', label: 'Дом' },
          { id: 'search', icon: '🔍', label: 'Поиск' },
          { id: 'magic', icon: '✨', label: 'Магия' },
          { id: 'content', icon: '📚', label: 'Контент' },
          { id: 'profile', icon: '👤', label: 'Я' },
        ].map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 ease-in-out group
              ${item.id === 'magic' ? 'relative -top-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-purple-400 to-fuchsia-500 shadow-lg shadow-purple-500/50 flex items-center justify-center text-white text-2xl transform hover:scale-105 active:scale-95' : 'text-gray-400 hover:text-purple-300'}
              ${activeTab === item.id && item.id !== 'magic' ? 'text-purple-400' : ''}
            `}
            onClick={() => {
              setActiveTab(item.id);
              handleHapticFeedback('light');
            }}
          >
            <span
              className={`
                ${item.id === 'magic' ? 'text-3xl' : 'text-2xl'}
                ${activeTab === item.id && item.id !== 'magic' ? 'bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-purple-200 to-fuchsia-300' : ''}
                ${activeTab === item.id && item.id !== 'magic' ? 'animate-bounce-sm' : ''}
              `}
            >
              {item.icon}
            </span>
            {item.id !== 'magic' && (
              <span className={`mt-1 ${activeTab === item.id ? 'text-purple-400' : ''}`}>{item.label}</span>
            )}
            {activeTab === item.id && item.id !== 'magic' && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfinitumProfileUI;