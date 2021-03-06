use hecs::Entity;

/// A component that represents the "side" or "handedness" that an entity is on
/// Used by components such as `Hand` and `Pointer` to identify which controller they should map to
#[derive(Debug, PartialEq, Clone, Copy, Eq, PartialOrd, Ord)]
pub enum Handedness {
    /// Left hand side
    Left,
    /// Right hand side
    Right,
}

/// A component that's added to an entity to represent a "hand" presence.
/// Used to give the player a feeling of immersion by allowing them to grab objects in the world
/// Requires `hands_system`
#[derive(Clone)]
pub struct Hand {
    /// How much has this hand been gripped?
    pub grip_value: f32,
    /// Which side is this hand on?
    pub handedness: Handedness,
    /// Have we grabbed something?
    pub grabbed_entity: Option<Entity>,
}

impl Hand {
    /// Shortcut helper to create a Left hand
    pub fn left() -> Hand {
        Hand {
            grip_value: 0.0,
            handedness: Handedness::Left,
            grabbed_entity: None,
        }
    }

    /// Shortcut helper to create a right hand
    pub fn right() -> Hand {
        Hand {
            grip_value: 0.0,
            handedness: Handedness::Right,
            grabbed_entity: None,
        }
    }
}
