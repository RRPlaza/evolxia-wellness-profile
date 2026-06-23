import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://syrexlxxwcqpslnmffav.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cmV4bHh4d2NxcHNsbm1mZmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjQyMjYsImV4cCI6MjA5Nzc0MDIyNn0.Oznu6Enn3B7D8XNDWmhHsmvXiIXWOgRaoTZvAeB0Elk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ====================================================================
   PERSONAS — CRUD
   ==================================================================== */

export async function listarPersonas() {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .order("nombre", { ascending: true });
  if (error) throw error;
  return data;
}

export async function crearPersona(persona) {
  const { data, error } = await supabase
    .from("personas")
    .insert({
      nombre: persona.nombre,
      fecha_nacimiento: persona.fechaNacimiento || null,
      sexo: persona.sexo,
      estatus: persona.estatus || "Prospecto",
      whatsapp: persona.whatsapp || null,
      email: persona.email || null,
      telefono: persona.telefono || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function actualizarEstatusPersona(personaId, nuevoEstatus) {
  const { data, error } = await supabase
    .from("personas")
    .update({ estatus: nuevoEstatus })
    .eq("id", personaId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function actualizarPersona(personaId, campos) {
  const { data, error } = await supabase
    .from("personas")
    .update(campos)
    .eq("id", personaId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function buscarPersonaPorNombre(nombre) {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .ilike("nombre", nombre.trim())
    .limit(1);
  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
}

export async function eliminarPersona(personaId) {
  const { error } = await supabase.from("personas").delete().eq("id", personaId);
  if (error) throw error;
}

/* ====================================================================
   PERFILES DE BIENESTAR — CRUD + HISTORIAL
   ==================================================================== */

function formToPerfilRow(personaId, form) {
  return {
    persona_id: personaId,
    fecha_evaluacion: form.fechaEvaluacion || new Date().toISOString().slice(0, 10),
    altura_pies: numOrNull(form.alturaPies),
    altura_pulgadas: numOrNull(form.alturaPulgadas),
    peso: numOrNull(form.peso),
    nivel_actividad: form.nivelActividad || null,
    objetivo: form.objetivo || null,
    coach: form.coach || null,
    bmi: numOrNull(form.bmi),
    bfr: numOrNull(form.bfr),
    muscle_rate: numOrNull(form.muscleRate),
    body_water: numOrNull(form.bodyWater),
    bone_mass: numOrNull(form.boneMass),
    bmr: numOrNull(form.bmr),
    protein_rate: numOrNull(form.proteinRate),
    edad_metabolica: numOrNull(form.edadMetabolica),
    grasa_visceral: numOrNull(form.grasaVisceral),
    grasa_subcutanea: numOrNull(form.grasaSubcutanea),
    masa_grasa: numOrNull(form.masaGrasa),
    masa_muscular: numOrNull(form.masaMuscular),
    nivel_obesidad: form.nivelObesidad || null,
    tipo_cuerpo: form.tipoCuerpo || null,
  };
}

function numOrNull(v) {
  if (v === "" || v === undefined || v === null) return null;
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

export async function guardarPerfil(personaId, form) {
  const row = formToPerfilRow(personaId, form);
  const { data, error } = await supabase
    .from("perfiles_bienestar")
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listarPerfilesDePersona(personaId) {
  const { data, error } = await supabase
    .from("perfiles_bienestar")
    .select("*")
    .eq("persona_id", personaId)
    .order("fecha_evaluacion", { ascending: true });
  if (error) throw error;
  return data;
}

/* Convierte una fila de Supabase (snake_case) al shape `form` (camelCase)
   que usa el resto de la app/canvas renderer. */
export function perfilRowToForm(row, personaExtra) {
  return {
    nombre: personaExtra?.nombre || "",
    fechaNacimiento: personaExtra?.fecha_nacimiento || "",
    sexo: personaExtra?.sexo || "F",
    alturaPies: row.altura_pies ?? "",
    alturaPulgadas: row.altura_pulgadas ?? "",
    peso: row.peso ?? "",
    nivelActividad: row.nivel_actividad || "moderado",
    objetivo: row.objetivo || "",
    fechaEvaluacion: row.fecha_evaluacion || "",
    coach: row.coach || "",
    whatsapp: personaExtra?.whatsapp || "",
    instagram: personaExtra?.instagram || "",
    bmi: row.bmi ?? "",
    bfr: row.bfr ?? "",
    muscleRate: row.muscle_rate ?? "",
    bodyWater: row.body_water ?? "",
    boneMass: row.bone_mass ?? "",
    bmr: row.bmr ?? "",
    proteinRate: row.protein_rate ?? "",
    edadMetabolica: row.edad_metabolica ?? "",
    grasaVisceral: row.grasa_visceral ?? "",
    grasaSubcutanea: row.grasa_subcutanea ?? "",
    masaGrasa: row.masa_grasa ?? "",
    masaMuscular: row.masa_muscular ?? "",
    nivelObesidad: row.nivel_obesidad || "Normal",
    tipoCuerpo: row.tipo_cuerpo || "Mesomorfo normal",
  };
}
