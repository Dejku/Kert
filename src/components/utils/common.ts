export function formatString(type: 'dni' | 'miesiące' | 'godziny', number: number): string {
    let string;

    if (type == 'dni')
        string = number == 1 ? 'dzień' : 'dni';
    else if (type == 'miesiące')
        string = number == 1 ? 'miesiąc' : number > 1 && number < 5 ? 'miesiące' : 'miesięcy';
    else
        string = number == 1 ? 'godzina' : number > 1 && number < 5 ? 'godziny' : 'godzin';

    return `${number} ${string}`
}