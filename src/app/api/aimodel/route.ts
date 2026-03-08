import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENRouter_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details, in order, and wait for the user's answer before asking the next:

Starting location (source)
Destination city or country
Group size (Solo, Couple, Family, Friends)
Budget (Low, Medium, High)
Trip duration (number of days)
Travel interests (e.g. adventure, sightseeing, cultural, food, nightlife, relaxation)
Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with response also send which ui component to display for generative UI for example budget/groupSize/tripDuration/final, where Final means generating or showing final plan.

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
Once all required information is collected, generate JSON only with:
{
  "resp": "Text for user",
  "ui": "budget" | "groupSize" | "tripDuration" | "final"
}`


const FINAL_PROMPT = `Generate Travel Plan with give details, give me Restaurants options list with RestaurantsName,
Restaurants address, Price, restaurants image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format. Output Schema:
{
"trip_plan": {
"destination": "string",
"duration": "string".
"origin": "string",
"budget": "string",
"group_size": "string",
"hotels":[
{
"restaurant _name": "string",
"restaurant _address": "string",
"price_per_night": "string",
"hotel_image_url": "string", "geo_coordinates":{ "latitude": "number",
"longitude": "number"
},
"rating": "number",
"description": "string"
}
"itinerary": [
{
"day": "number",
"day_plan": "string",
"best_time_to_visit_day": "string",
"activities": [
{
"place_name": "string",
"place_details": "string",
"place_image_url":"string", "geo_coordinates":{
},
"latitude": "number", "longitude": "number"
"place_address": "string", "ticket_pricing": "string",
"time_travel_each_location": "string",
"best_time_to_visit": "string"`




type AIResponse = {
  type: "json_object";
  value: { resp: string; ui: string };
};

// Type guard
function isAIResponse(obj: any): obj is AIResponse {
  return obj && obj.type === "json_object" && typeof obj.value === "object";
}

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      max_tokens: 38,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: isFinal?FINAL_PROMPT:PROMPT }, ...messages],
    });

    const rawContent = completion.choices?.[0]?.message?.content;

    let value: { resp: string; ui: string } | null = null;

    if (isAIResponse(rawContent)) {
      // Properly typed json_object
      value = rawContent.value;
    } else if (typeof rawContent === "string") {
      // Sometimes AI returns stringified JSON
      try {
        const parsed = JSON.parse(rawContent);
        if (parsed.resp && parsed.ui) value = parsed;
      } catch {
        value = null;
      }
    }

    if (!value) {
      return NextResponse.json({ error: "AI did not return a valid JSON response." });
    }

    return NextResponse.json(value);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage });
  }
}