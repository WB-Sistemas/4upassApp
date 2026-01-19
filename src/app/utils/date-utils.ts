export class DateUtils{
    static IsoString(fecha: string): Date {
        const trimmed = (fecha ?? '').trim();
        if (!trimmed) {
            return new Date(NaN);
        }
        const hasTz = /Z$|[+-]\d{2}:?\d{2}$/.test(trimmed);
        const normalized = hasTz ? trimmed : `${trimmed}Z`;
        return new Date(normalized);
    }

    static DateToIsoStringWithCustomTime(fecha: Date, horas: number = 0, minutos: number = 0, segundos: number = 0): string {
        const hs = String(horas).padStart(2, '0');
        const min = String(minutos).padStart(2, '0');
        const seg = String(segundos).padStart(2, '0');
        return fecha.toISOString().split('T')[0] + `T${hs}:${min}:${seg}.000Z`;
    }
}
