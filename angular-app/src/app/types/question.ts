export interface Question {
    id: number;
    stage_number: number;
    question_text: string;
    question_image_url: string | null;
    answer_type: string;
    choices: Choice[];
    answer_correct: number;
};
export interface Choice {
    question_id: number;
    content: string;
    order_number: number;
}
