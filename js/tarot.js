// Real Tarot Card System with Images and Meanings
const TAROT_DECK = {
    majorArcana: [
        {
            id: 0,
            name: 'The Fool',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
            meaning: 'New beginnings, innocence, spontaneity, a free spirit',
            upright: 'New beginnings, innocence, spontaneity, a free spirit',
            reversed: 'Recklessness, risk-taking, naivety, poor judgment',
            description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.'
        },
        {
            id: 1,
            name: 'The Magician',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Manifestation, resourcefulness, power, inspired action',
            upright: 'Manifestation, resourcefulness, power, inspired action',
            reversed: 'Manipulation, poor planning, untapped talents',
            description: 'The Magician signifies manifestation, resourcefulness, power, and inspired action. It represents having all the tools you need to succeed.'
        },
        {
            id: 2,
            name: 'The High Priestess',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
            upright: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
            reversed: 'Secrets, disconnected from intuition, withdrawal and silence',
            description: 'The High Priestess represents intuition, sacred knowledge, and the subconscious mind. She sits between the conscious and unconscious worlds.'
        },
        {
            id: 3,
            name: 'The Empress',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Femininity, beauty, nature, nurturing, abundance',
            upright: 'Femininity, beauty, nature, nurturing, abundance',
            reversed: 'Creative block, dependence on others, lack of growth',
            description: 'The Empress is a symbol of fertility, nurturing, and abundance. She represents Mother Nature and the divine feminine.'
        },
        {
            id: 4,
            name: 'The Emperor',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Authority, establishment, structure, a father figure',
            upright: 'Authority, establishment, structure, a father figure',
            reversed: 'Domination, excessive control, lack of discipline, inflexibility',
            description: 'The Emperor represents authority, structure, control, and fatherhood. He is the archetype of the ruler and the protector.'
        },
        {
            id: 5,
            name: 'The Hierophant',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition, conventions',
            upright: 'Spiritual wisdom, religious beliefs, conformity, tradition, conventions',
            reversed: 'Personal beliefs, freedom, challenging the status quo',
            description: 'The Hierophant represents spiritual wisdom, religious beliefs, and conformity to tradition.'
        },
        {
            id: 6,
            name: 'The Lovers',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Love, harmony, relationships, values alignment, choices',
            upright: 'Love, harmony, relationships, values alignment, choices',
            reversed: 'Self-love, disharmony, imbalance, misalignment of values',
            description: 'The Lovers card represents love, harmony, and relationships. It also signifies important choices and alignment of values.'
        },
        {
            id: 7,
            name: 'The Chariot',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Control, willpower, success, action, determination',
            upright: 'Control, willpower, success, action, determination',
            reversed: 'Lack of control, lack of direction, aggression, no control',
            description: 'The Chariot represents control, willpower, success, and determination. It signifies overcoming obstacles through focus and discipline.'
        },
        {
            id: 8,
            name: 'Strength',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Strength, courage, persuasion, influence, compassion',
            upright: 'Strength, courage, persuasion, influence, compassion',
            reversed: 'Weakness, self-doubt, lack of self-discipline, raw emotion',
            description: 'Strength represents inner strength, courage, and compassion. It shows the power of gentle control over brute force.'
        },
        {
            id: 9,
            name: 'The Hermit',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Soul searching, introspection, being alone, inner guidance',
            upright: 'Soul searching, introspection, being alone, inner guidance',
            reversed: 'Isolation, withdrawal, recluse, being anti-social',
            description: 'The Hermit represents soul searching, introspection, and inner guidance. It signifies a time for reflection and seeking answers within.'
        },
        {
            id: 10,
            name: 'Wheel of Fortune',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Good luck, karma, life cycles, destiny, a turning point',
            upright: 'Good luck, karma, life cycles, destiny, a turning point',
            reversed: 'Bad luck, resistance to change, breaking cycles',
            description: 'The Wheel of Fortune represents cycles, destiny, and turning points. It signifies the ever-changing nature of life.'
        },
        {
            id: 11,
            name: 'Justice',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Justice, fairness, truth, cause and effect, law',
            upright: 'Justice, fairness, truth, cause and effect, law',
            reversed: 'Unfairness, lack of accountability, dishonesty',
            description: 'Justice represents fairness, truth, and cause and effect. It signifies accountability and the consequences of actions.'
        },
        {
            id: 12,
            name: 'The Hanged Man',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Pause, surrender, letting go, new perspectives',
            upright: 'Pause, surrender, letting go, new perspectives',
            reversed: 'Delays, resistance, stalling, indecision',
            description: 'The Hanged Man represents pause, surrender, and new perspectives. It signifies letting go and seeing things from a different angle.'
        },
        {
            id: 13,
            name: 'Death',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Endings, change, transformation, transition',
            upright: 'Endings, change, transformation, transition',
            reversed: 'Resistance to change, unable to move on, delaying the inevitable',
            description: 'Death represents endings, transformation, and new beginnings. It signifies the natural cycle of life and change.'
        },
        {
            id: 14,
            name: 'Temperance',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Balance, moderation, patience, purpose',
            upright: 'Balance, moderation, patience, purpose',
            reversed: 'Imbalance, excess, lack of long-term vision',
            description: 'Temperance represents balance, moderation, and patience. It signifies finding harmony and purpose in life.'
        },
        {
            id: 15,
            name: 'The Devil',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Shadow self, attachment, addiction, restriction, sexuality',
            upright: 'Shadow self, attachment, addiction, restriction, sexuality',
            reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
            description: 'The Devil represents shadow self, attachment, and restriction. It signifies being bound by material desires and limiting beliefs.'
        },
        {
            id: 16,
            name: 'The Tower',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Sudden change, upheaval, chaos, revelation, awakening',
            upright: 'Sudden change, upheaval, chaos, revelation, awakening',
            reversed: 'Personal transformation, fear of change, averting disaster',
            description: 'The Tower represents sudden change, upheaval, and revelation. It signifies the breaking down of false structures and awakening.'
        },
        {
            id: 17,
            name: 'The Star',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Hope, faith, purpose, renewal, spirituality',
            upright: 'Hope, faith, purpose, renewal, spirituality',
            reversed: 'Lack of faith, despair, self-trust, disconnection',
            description: 'The Star represents hope, faith, and renewal. It signifies healing, inspiration, and spiritual guidance.'
        },
        {
            id: 18,
            name: 'The Moon',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Illusion, fear, anxiety, subconscious, intuition',
            upright: 'Illusion, fear, anxiety, subconscious, intuition',
            reversed: 'Release of fear, repressed emotion, inner confusion',
            description: 'The Moon represents illusion, fear, and the subconscious. It signifies navigating through uncertainty and trusting intuition.'
        },
        {
            id: 19,
            name: 'The Sun',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Positivity, fun, warmth, success, vitality',
            upright: 'Positivity, fun, warmth, success, vitality',
            reversed: 'Inner child, feeling down, overly optimistic',
            description: 'The Sun represents positivity, joy, and success. It signifies vitality, enlightenment, and the warmth of life.'
        },
        {
            id: 20,
            name: 'Judgement',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Judgment, reflection, evaluation, awakening, rebirth',
            upright: 'Judgment, reflection, evaluation, awakening, rebirth',
            reversed: 'Lack of self-awareness, doubt, self-loathing',
            description: 'Judgement represents reflection, evaluation, and awakening. It signifies a time of reckoning and spiritual rebirth.'
        },
        {
            id: 21,
            name: 'The World',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
            meaning: 'Completion, accomplishment, fulfillment, belonging, wholeness',
            upright: 'Completion, accomplishment, fulfillment, belonging, wholeness',
            reversed: 'Lack of closure, incomplete, seeking personal closure',
            description: 'The World represents completion, accomplishment, and fulfillment. It signifies the end of a journey and the beginning of a new cycle.'
        }
    ]
};

// Tarot Reading System
class TarotReader {
    constructor() {
        this.spreadTypes = {
            pastPresentFuture: {
                name: 'Past, Present, Future',
                positions: ['Past', 'Present', 'Future'],
                count: 3
            },
            celticCross: {
                name: 'Celtic Cross',
                positions: ['Current Situation', 'Challenge', 'Distant Past', 'Recent Past', 'Possible Future', 'Near Future', 'Your Approach', 'External Influences', 'Hopes and Fears', 'Final Outcome'],
                count: 10
            },
            threeCard: {
                name: 'Three Card Spread',
                positions: ['Situation', 'Action', 'Outcome'],
                count: 3
            }
        };
    }
    
    // Draw random cards
    drawCards(count = 3) {
        const deck = [...TAROT_DECK.majorArcana];
        const drawn = [];
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const card = deck.splice(randomIndex, 1)[0];
            const isReversed = Math.random() > 0.5;
            drawn.push({
                ...card,
                reversed: isReversed,
                meaning: isReversed ? card.reversed : card.upright
            });
        }
        
        return drawn;
    }
    
    // Generate reading interpretation
    generateReading(cards, spreadType = 'threeCard') {
        const spread = this.spreadTypes[spreadType];
        let reading = '';
        
        if (spread) {
            cards.forEach((card, index) => {
                const position = spread.positions[index] || `Position ${index + 1}`;
                reading += `<div class="reading-card-interpretation">
                    <h4>${position}: ${card.name} ${card.reversed ? '(Reversed)' : ''}</h4>
                    <p><strong>Meaning:</strong> ${card.meaning}</p>
                    <p>${card.description}</p>
                </div>`;
            });
        } else {
            // Default interpretation
            cards.forEach((card, index) => {
                reading += `<div class="reading-card-interpretation">
                    <h4>Card ${index + 1}: ${card.name} ${card.reversed ? '(Reversed)' : ''}</h4>
                    <p><strong>Meaning:</strong> ${card.meaning}</p>
                    <p>${card.description}</p>
                </div>`;
            });
        }
        
        // Add overall interpretation
        const overall = this.generateOverallInterpretation(cards);
        reading += `<div class="overall-reading">
            <h3>Overall Interpretation</h3>
            <p>${overall}</p>
        </div>`;
        
        return reading;
    }
    
    // Generate overall interpretation based on cards
    generateOverallInterpretation(cards) {
        const themes = cards.map(c => c.meaning.toLowerCase());
        const reversedCount = cards.filter(c => c.reversed).length;
        
        let interpretation = 'Your reading reveals a journey of ';
        
        if (reversedCount === 0) {
            interpretation += 'positive transformation and alignment. ';
        } else if (reversedCount === cards.length) {
            interpretation += 'challenges and inner reflection. ';
        } else {
            interpretation += 'balance between light and shadow. ';
        }
        
        interpretation += `The cards suggest ${themes.join(', ')}. `;
        interpretation += 'Take time to reflect on these messages and trust your intuition as you navigate your path forward.';
        
        return interpretation;
    }
}

// Initialize tarot reader
const tarotReader = new TarotReader();

