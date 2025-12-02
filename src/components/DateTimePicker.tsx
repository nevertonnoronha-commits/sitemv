import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    onDateChange(`${year}-${month}-${dayStr}`);
    setShowCalendar(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("pt-BR", { 
      day: "2-digit", 
      month: "long", 
      year: "numeric" 
    });
  };

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <div>
        <label className="text-white/70 text-sm mb-3 block">Data da viagem</label>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full flex items-center gap-3 px-4 h-12 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <Calendar className="w-4 h-4 text-white/30" />
          <span className="text-sm">
            {date ? formatDate(date) : "Selecione a data"}
          </span>
        </button>

        {/* Calendar Dropdown */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 backdrop-blur-xl"
            >
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-white font-medium text-sm">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-white/40 text-xs py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && handleDateSelect(day)}
                    disabled={!day}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-300
                      ${!day ? "invisible" : ""}
                      ${day ? "hover:bg-white/10 text-white" : ""}
                      ${
                        date &&
                        new Date(date + "T00:00:00").getDate() === day &&
                        new Date(date + "T00:00:00").getMonth() === currentMonth.getMonth()
                          ? "bg-white text-black font-medium"
                          : ""
                      }
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Time Picker */}
      <div>
        <label className="text-white/70 text-sm mb-3 block">Horário da viagem</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeChange(slot)}
              className={`
                px-3 py-2 rounded-lg text-sm transition-all duration-300
                ${
                  time === slot
                    ? "bg-white text-black font-medium"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }
              `}
            >
              <Clock className="w-3 h-3 inline mr-1.5" />
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
